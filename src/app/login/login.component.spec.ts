import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../register.service';
import { User } from '../user';
import {of} from 'rxjs';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectDetail } from '../project-detail';
import { Router } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let _service: RegisterService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      
      imports:[HttpClientModule,ReactiveFormsModule,FormsModule,BrowserAnimationsModule,
        RouterTestingModule.withRoutes(
          [{ path: 'adminLog', component: AdminLoginComponent},
          {
            path:'registration',
            component:RegistrationComponent
          }]
        )],
      providers:[RegisterService],
      declarations: [ LoginComponent ]
    })
    
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
  //   RouterTestingModule.withRoutes([
  //     { path: '/adminLog', component: AdminLoginComponent}
  // ]),
    component = fixture.componentInstance;
    _service=TestBed.inject(RegisterService);
    router=TestBed.get(Router);
    //router=TestBed.inject(RouterTestingModule);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should login and navigate to adminLog', () => {
    const user1=new User();
    user1.userid='abc';
    user1.userpassword='abc';
    component.user=user1;
    spyOn(_service,'loginUser').withArgs(user1).and.returnValue(of(user1));
    const spy=spyOn(router,'navigate');
    component.loginUser();
    expect(spy).toHaveBeenCalledWith(['adminLog']);
  });

  it('should navigate to register page',()=>{
    const spy=spyOn(router,'navigate');
    component.goToRegistration();
    expect(spy).toHaveBeenCalledWith(['registration']);

  })
});
