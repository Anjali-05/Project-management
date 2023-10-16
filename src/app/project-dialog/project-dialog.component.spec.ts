import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDialogComponent } from './project-dialog.component';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {  MatDialogModule,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {of} from 'rxjs';
import { RegisterService } from '../register.service';
import { ProjectDetail } from '../project-detail';
describe('ProjectDialogComponent', () => {
  let component: ProjectDialogComponent;
  let fixture: ComponentFixture<ProjectDialogComponent>;
  let formBuilder=new FormBuilder();
  let service:RegisterService;
  
  const mywindow={
    location:{
      reload(){
        return 'something'
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { 
          provide: MAT_DIALOG_DATA,
          useValue: {} 
        }
      ],
      declarations: [ ProjectDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDialogComponent);
    component = fixture.componentInstance;
    service=TestBed.inject(RegisterService);
    component.compwindow=mywindow;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add project',()=>{
    
    component.projectForm.setValue({
      projectDescription:'abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcv',
      projectEndDate:'abc',
      projectManagerEmailId:'abc',
      projectId:'abc',
      projectManagerName:'abc',
      projectName:'abc',
      projectStartDate:'abc',
      remarks:'abc',
      status:'To-Do',
      teamName:'abc',
      teamSize:'abc',
      techLeadEmailId:'abc',
      techStack:'abc',
      techLeadName:'abc'
    });
    
    
    spyOn(localStorage,'getItem').withArgs('projectName').and.returnValue(null);
    spyOn(service,'postProject').withArgs(component.projectForm.value).and.returnValue(of(0));
    const spy1=spyOn(component.projectForm,'reset');
    const spy2=spyOn(mywindow.location,'reload');
    const spy3=spyOn(window,'alert');
    component.AddProject();
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalledWith("Action Successful.");
   
  });

    it('should check ngOninit',()=>{
      


    })
});
