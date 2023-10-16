import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginComponent } from './admin-login.component';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';
import { ViewStoryComponent } from '../view-story/view-story.component';
import { ProjectDetail } from '../project-detail';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;
  let service: RegisterService;
  let router:Router;
  

  const myWindow = {
    location: {
      reload() { return 'something'; }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatDialogModule,HttpClientModule,BrowserAnimationsModule,RouterTestingModule.withRoutes(
        [
          {
            path:'',
            component:LoginComponent
          },
          {
            path:'viewStory',
            component:ViewStoryComponent
          }
        ]
      )],
      declarations: [ AdminLoginComponent ],
      providers:[RegisterService,FormBuilder]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    service=TestBed.inject(RegisterService);
    router=TestBed.get(Router);
    component.compwindow=myWindow;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should logout',()=>{
    const spy=spyOn(router,'navigate');
    component.logout();
    expect(spy).toHaveBeenCalledWith(['/']);
  });

  it('should View story',()=>{
    const spy=spyOn(router,'navigate');
    const projectdetail=new ProjectDetail();
    component.viewStory(projectdetail);
    expect(spy).toHaveBeenCalledWith(['/viewStory']);
  });


  it('should delete project',()=>{
    const projectid='abc';
    spyOn(service,'deleteProject').withArgs(projectid).and.returnValue(of(1));
    const spy=spyOn(window,'alert');
    component.deleteProject(projectid);
    expect(spy).toHaveBeenCalledWith("Deletion Successfull for "+projectid);
    
  });
  
  it('should edit project',()=>{
    const poj1=new ProjectDetail();
    poj1.projectDescription='abc'
    poj1.projectEndDate='abc'
    poj1.projectManagerEmailId='abc'
    poj1.projectId='abc'
    poj1.projectManagerName='abc'
    poj1.projectName='abc'
    poj1.projectStartDate='abc'
    poj1.remarks='abc'
    poj1.status='abc'
    poj1.teamName='abc'
    poj1.teamSize='abc'
    poj1.techLeadEmailId='abc'
    poj1.techStack='abc'
    poj1.techLeadName='abc'
    const project:ProjectDetail[]=[poj1];
    component.project=project;
    const row=new ProjectDetail();
    row.projectId='abc';
    const spy=spyOn(localStorage,'setItem');
    
    component.editProject(row);
    expect(component.editClicked).toBe(true);
    expect(spy).toHaveBeenCalledWith('projectId',row.projectId)
    expect(spy).toHaveBeenCalledWith('editClicked','true');

    expect(spy).toHaveBeenCalledWith('projectName',component.editData.projectName)
    expect(spy).toHaveBeenCalledWith('projectDescription',component.editData.projectDescription)
    expect(spy).toHaveBeenCalledWith('projectManagerName',component.editData.projectManagerName)
    expect(spy).toHaveBeenCalledWith('projectManagerEmailId',component.editData.projectManagerEmailId)
    expect(spy).toHaveBeenCalledWith('projectStartDate',component.editData.projectStartDate)
    expect(spy).toHaveBeenCalledWith('projectEndDate',component.editData.projectEndDate)
    expect(spy).toHaveBeenCalledWith('remarks',component.editData.remarks)
    expect(spy).toHaveBeenCalledWith('status',component.editData.status)
    expect(spy).toHaveBeenCalledWith('teamName',component.editData.teamName)
    expect(spy).toHaveBeenCalledWith('teamSize',component.editData.teamSize)
    expect(spy).toHaveBeenCalledWith('techLeadName',component.editData.techLeadName)
    expect(spy).toHaveBeenCalledWith('techLeadEmailId',component.editData.techLeadEmailId)
    expect(spy).toHaveBeenCalledWith('techStack',component.editData.techStack)


  }
  )
  
});
