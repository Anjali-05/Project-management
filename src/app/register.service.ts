import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { ProjectDetail } from './project-detail';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl="http://localhost:8093/login";
  private registerUrl="http://localhost:8093/registerUser";
  project!:ProjectDetail
  constructor(private _http:HttpClient) { }

  loginUser(user: User):Observable<any>{
    console.log(user);
    return this._http.post(`${this.baseUrl}`,user);
  }
  registerUser(user: User):Observable<any>{
    console.log(user);
    return this._http.post(`${this.registerUrl}`,user);
  }
  getProject():Observable<any>{
     return this._http.get(`http://localhost:8094/getProject`)
  }
  getProjectById(projectId: string | null):Observable<any>{
    return this._http.get(`http://localhost:8094/getProjectByProjectId/`+projectId)
 }
  postProject(data: any):Observable<any>{
    return this._http.post(`http://localhost:8094/registerProject`,data)
  }
  deleteProject(projectId:string):Observable<any>{
    console.log("inside delete service")
    return this._http.delete(`http://localhost:8094/deleteProject?projectId=`+projectId);
  }
  postStory(data: any):Observable<any>{
    return this._http.post(`http://localhost:8095/addStory`,data)
  }
  getStory():Observable<any>{
    return this._http.get(`http://localhost:8095/getStory`)
 }
  getStorytByProjectId(projectId: string | null):Observable<any>{
    return this._http.get(`http://localhost:8095/getStoryByProjectId/`+projectId)
  }
  deleteStory(storyId:string):Observable<any>{
    console.log("inside delete service")
    return this._http.delete(`http://localhost:8095/deleteStory?storyId=`+storyId);
  }
}
