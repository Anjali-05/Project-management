import { Component, OnInit,Inject, Input } from '@angular/core';
import { ProjectDetail } from '../project-detail';
import{FormBuilder, FormGroup, Validators} from '@angular/forms'
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AdminLoginComponent} from '../admin-login/admin-login.component'

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
project!:ProjectDetail;
projectDetail!:ProjectDetail
projectForm!:FormGroup;
compwindow:any


usertype:string=localStorage.getItem('usertype')!;
projectId:string | null = localStorage.getItem('projectId')
actionBtn:string="Save"
  constructor(private FormBuilder:FormBuilder,private _service:RegisterService,private _router:Router,private dialogRef:MatDialogRef<ProjectDialogComponent>,@Inject(MAT_DIALOG_DATA) public edititem:any) {
    this.compwindow=window
   }
  //constructor(){}
  ngOnInit(): void {
    this.projectForm=this.FormBuilder.group({
      projectId:['',[Validators.required]],
      projectName:['',[Validators.required]],
      projectDescription:['',[Validators.required,Validators.minLength(100)]],
      teamName :['',[Validators.required]],
      teamSize:['',[Validators.required]],
      projectManagerName:['',[Validators.required]],
      projectManagerEmailId:['',[Validators.required,Validators.email]],
      techLeadName:['',[Validators.required]],
      techLeadEmailId:['',[Validators.required,Validators.email]],
      projectStartDate:['',[Validators.required]],
      projectEndDate:['',[Validators.required]],
      techStack:['',[Validators.required]],
      status:['',[Validators.required]],
      remarks:['',[Validators.required]]
    });
    
    // if(localStorage.getItem('editClicked')=='true'){
    //   localStorage.setItem('editClicked','false')
    //   console.log(this.projectId)
    //   // if(this.projectId){
    //   // this._service.getProjectById(this.projectId).subscribe(
    //   //   data=>{
    //   //     console.log(data)
    //   //   }
    //   // )
        
    //   // }
    // }
    
    //console.log("Inside dialog "+localStorage.getItem('projectName')+this.projectId)
    if(localStorage.getItem('projectName')){
      this.actionBtn="Update"
      this.projectForm.controls['projectId'].setValue(localStorage.getItem('projectId'))
      this.projectForm.controls['projectName'].setValue(localStorage.getItem('projectName'))
      this.projectForm.controls['projectDescription'].setValue(localStorage.getItem('projectDescription'))
      this.projectForm.controls['projectManagerName'].setValue(localStorage.getItem('projectManagerName'))
      this.projectForm.controls['projectManagerEmailId'].setValue(localStorage.getItem('projectManagerEmailId'))
      this.projectForm.controls['projectStartDate'].setValue(localStorage.getItem('projectStartDate'))
      this.projectForm.controls['projectEndDate'].setValue(localStorage.getItem('projectEndDate'))
      this.projectForm.controls['remarks'].setValue(localStorage.getItem('remarks'))
      this.projectForm.controls['status'].setValue(localStorage.getItem('status'))
      this.projectForm.controls['teamName'].setValue(localStorage.getItem('teamName'))
      this.projectForm.controls['teamSize'].setValue(localStorage.getItem('teamSize'))
      this.projectForm.controls['techLeadName'].setValue(localStorage.getItem('techLeadName'))
      this.projectForm.controls['techLeadEmailId'].setValue(localStorage.getItem('techLeadEmailId'))
      this.projectForm.controls['techStack'].setValue(localStorage.getItem('techStack'))
      console.log("hi"+localStorage.getItem('projectId'))
      this.projectId=localStorage.getItem('storyProjectId')
      localStorage.clear();
      localStorage.setItem('usertype',this.usertype)
      localStorage.setItem('storyProjectId',this.projectId!)
    }
   

  }
  AddProject(){
    if(!localStorage.getItem('projectName')){
      console.log("Save Clicked");
    console.log(this.projectForm.value);
    console.log(this.projectForm.valid);
    if(this.projectForm.valid){
      this._service.postProject(this.projectForm.value).subscribe({
        next:(res)=>{
          alert("Action Successful.");
          this.projectForm.reset();
          //this.dialogRef.close('save');
          // window.location.reload();
          this.compwindow.location.reload();
        },
        error:()=>{
          alert("Error Occurred");
        }
      })
    }
    }
    // else{
    //   console.log("Update Clicked");
    //   this.updateProject()
    // }
  }

  // updateProject(){
  //   if(this.projectForm.valid){
  //     this._service.postProject(this.projectForm.value).subscribe({
  //       next:(res)=>{
  //         alert("Action Successful.");
  //         this.projectForm.reset();
  //         this.dialogRef.close('update');
  //         window.location.reload();
  //       },
  //       error:()=>{
  //         alert("Error Occurred");
  //       }
  //     })
  //   }
  // }

}
