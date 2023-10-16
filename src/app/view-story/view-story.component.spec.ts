import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStoryComponent } from './view-story.component';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { RegisterService } from '../register.service';
import {of} from 'rxjs';
import { story } from '../story';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';

describe('ViewStoryComponent', () => {
  let component: ViewStoryComponent;
  let fixture: ComponentFixture<ViewStoryComponent>;
  let service:RegisterService;
  let router:Router;
  const myWindow = {
    location: {
      reload() { return 'something'; }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatDialogModule,HttpClientModule,BrowserAnimationsModule,RouterTestingModule.withRoutes([
        {
          path:'',
          component:LoginComponent
        }
      ])],
      declarations: [ ViewStoryComponent ],
      providers:[FormBuilder,MatFormFieldModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStoryComponent);
    service=TestBed.inject(RegisterService);
    router=TestBed.get(Router);
    component = fixture.componentInstance;
    component.compwindow=myWindow;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should delete story',()=>{
    const storyid='abc';
    spyOn(service,'deleteStory').withArgs(storyid).and.returnValue(of(1));
    const spy=spyOn(window,'alert');
    component.deleteStory(storyid);
    expect(spy).toHaveBeenCalledWith("Deletion Successfull for "+storyid);
    
  })
  it('should edit story',()=>{
    const str=new story();
    str.assignee='abc';
    str.assigneeEmail='abc';
    str.assignmentDate='abc';
    str.projectId='abc';
    str.remarks='abc';
    str.status='abc';
    str.storyDescription='abc';
    str.storyTitle='abc';
    str.targetDate='abc';
    str.storyId='abc';
    const story1:story[]=[str];
    component.story=story1;
    const row=new story();
    row.storyId='abc';
    row.projectId='abc';
    const spy=spyOn(localStorage,'setItem');
    component.editStory(row);
    expect(spy).toHaveBeenCalledWith('projectId',component.story1.projectId)
    expect(spy).toHaveBeenCalledWith('storyId',component.story1.storyId)
    expect(spy).toHaveBeenCalledWith('storyTitle',component.story1.storyTitle)
    expect(spy).toHaveBeenCalledWith('assigneeEmail',component.story1.assigneeEmail)
    expect(spy).toHaveBeenCalledWith('storyDescription',component.story1.storyDescription)
    expect(spy).toHaveBeenCalledWith('assignmentDate',component.story1.assignmentDate)
    expect(spy).toHaveBeenCalledWith('targetDate',component.story1.targetDate)
    expect(spy).toHaveBeenCalledWith('remarks',component.story1.remarks)
    expect(spy).toHaveBeenCalledWith('status',component.story1.status)
    expect(spy).toHaveBeenCalledWith('assignee',component.story1.assignee)
  })
  it('should logout',()=>{
    const spy=spyOn(router,'navigate');
    component.logout();
    expect(spy).toHaveBeenCalledWith(['/']);
  })
});
