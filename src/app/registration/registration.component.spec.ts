import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../register.service';
import { User } from '../user';
import {of} from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { compileComponentFromMetadata } from '@angular/compiler';
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let service: RegisterService;
  let router:Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,FormsModule,RouterTestingModule.withRoutes([
        {
          path:'',
          component:LoginComponent
      }
      ])],
      declarations: [ RegistrationComponent ],
      providers:[RegisterService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    service=TestBed.inject(RegisterService);
    router=TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create RegisterUser',()=>{
    const user1=new User();
    user1.userid="abc";
    user1.username="abc";
    user1.userpassword="abc";
    user1.email="abc";
    user1.contact="abc";
    user1.dob="abc";
    user1.usertype="abc";
    component.user=user1;
    spyOn(service,'registerUser').withArgs(user1).and.returnValue(of(user1));
    
    const spy=spyOn(router,'navigate');
    component.RegisterUser();
    expect(spy).toHaveBeenCalledWith(['/']);
    });

});
