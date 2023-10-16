import { TestBed } from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterService } from './register.service';
import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { of } from 'rxjs';

describe('RegisterService', () => {
  let service: RegisterService;
  let user:{
    "userid":"anjali05",
    "username":"",
    "email":"",
    "contact":"",
    "dob":"",
    "usertype":"admin",
    "userpassword":"Admin@12"
  };
  let credentials:{
    "userId":"anjali05",
    "userType":"admin",
    "password":"Admin@12"
  };
  let project:{
    'projectId':'POJ101',
    'projectName':'Hospital Management',
    'projectDescription':"",
    'teamName':"",
    'teamSize':"",
    'projectManagerName':"",
    'projectManagerEmailId':"",
    'techLeadName':"",
    'techLeadEmailId':"",
    'projectStartDate':"",
    'projectEndDate':"",
    'techStack':"",
    'status':"",
    'remarks':""
  };
  let story:{
    'projectId':"POJ101",
    'storyId':"SO101-1",
    'storyTitle':"UI Testing",
    'storyDescription':"",
    'assignee':"",
    'assigneeEmail':"",
    'assignmentDate':"",
    'targetDate':"",
    'status':"",
    'remarks':""
  };
  let projectId="POJ101";
  let storyId="SO101-1";
  let httpClientSpy:jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    let httpClientSpyObj=jasmine.createSpyObj('HttpClient',['post','get','delete']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpClientTestingModule],
      providers:[LoginComponent,AdminLoginComponent,
        {
          provide:HttpClient,
          useValue:httpClientSpyObj
        }
      ]
    });
    service = TestBed.inject(RegisterService);
    httpClientSpy=TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user',(done:DoneFn)=>{
    httpClientSpy.post.and.returnValue(of(credentials));
    service.loginUser(user).subscribe({
      next:(user)=>{
        expect(user).toEqual(credentials);
        done();
      },
      error:()=>{
        done.fail
      }
    });
    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should register user',(done:DoneFn)=>{
    httpClientSpy.post.and.returnValue(of("Registered Successfully"));
    service.registerUser(user).subscribe({
      next:(user)=>{
        expect(user).toEqual("Registered Successfully");
        done();
      },error:()=>{
        done.fail;
      }
    });
    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should add Project',(done:DoneFn)=>{
    httpClientSpy.post.and.returnValue(of("Project Added Successfully"));
    service.postProject(project).subscribe({
      next:(project)=>{
        expect(project).toEqual("Project Added Successfully");
        done();
      },error:()=>{
        done.fail;
      }
    });
    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should add story',(done:DoneFn)=>{
    httpClientSpy.post.and.returnValue(of("Story Added Successfully"));
    service.postStory(story).subscribe({
      next:(story)=>{
        expect(story).toEqual("Story Added Successfully");
        done();
      },error:()=>{
        done.fail;
      }
    });
    expect(httpClientSpy.post).toHaveBeenCalled();
  });

  it('should fetch story by project Id',(done:DoneFn)=>{
    httpClientSpy.get.and.returnValue(of("Story Fetched Successfully"));
    service.getStorytByProjectId(projectId).subscribe({
      next:(story)=>{
        expect(story).toEqual("Story Fetched Successfully");
        done();
      },error:()=>{
        done.fail;
      }
    });
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should fetch story',(done:DoneFn)=>{
    httpClientSpy.get.and.returnValue(of("All Story Fetched Successfully"));
    service.getStory().subscribe({
      next:(story)=>{
        expect(story).toEqual("All Story Fetched Successfully");
        done();
      },error:()=>{
        done.fail;
      }
    });
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should fetch project by project Id',(done:DoneFn)=>{
    httpClientSpy.get.and.returnValue(of("Project fetched by Id successfully"));
    service.getProjectById(projectId).subscribe({
      next:(project)=>{
        expect(project).toEqual("Project fetched by Id successfully");
        done();
      },error:()=>{
        done.fail
      }
    });
    expect(httpClientSpy.get).toHaveBeenCalled();
  });

  it('should delete project',(done:DoneFn)=>{
    httpClientSpy.delete.and.returnValue(of("Project Deleted Successfully"));
    service.deleteProject(projectId).subscribe({
      next:(data)=>{
        expect(data).toEqual("Project Deleted Successfully");
        done();
      },error:()=>{
        done.fail;
      }
    });
    expect(httpClientSpy.delete).toHaveBeenCalled();
  });

  it('should delete story',(done:DoneFn)=>{
    httpClientSpy.delete.and.returnValue(of("Story Deleted Successfully"));
    service.deleteStory(storyId).subscribe({
      next:(data)=>{
        expect(data).toEqual("Story Deleted Successfully");
        done();
      },error:()=>{
        done.fail;
      }
    });
    expect(httpClientSpy.delete).toHaveBeenCalled();
  });
});
