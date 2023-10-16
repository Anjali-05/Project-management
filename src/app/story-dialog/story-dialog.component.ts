import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, Validators} from '@angular/forms'
import { RegisterService } from '../register.service';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-story-dialog',
  templateUrl: './story-dialog.component.html',
  styleUrls: ['./story-dialog.component.css']
})
export class StoryDialogComponent implements OnInit {

  storyForm!:FormGroup;
  projectId!:string;
  projectName!:string;
  actionBtn:string="Save";
  usertype:string=localStorage.getItem('usertype')!
  checkemail:string=localStorage.getItem('checkemail')!
  constructor(private FormBuilder:FormBuilder,private _service:RegisterService,private dialogRef:MatDialogRef<StoryDialogComponent>,private matform:MatFormFieldModule) { }

  ngOnInit(): void {

    this.storyForm=this.FormBuilder.group({
      projectId:['',Validators.required],
      storyId:['',Validators.required],
      storyTitle:['',Validators.required],
      storyDescription:['',[Validators.required,Validators.minLength(100)]],
      assignee:['',Validators.required],
      assigneeEmail:['',Validators.required],
      assignmentDate:['',Validators.required],
      targetDate:['',Validators.required],
      status:['',Validators.required],
      remarks:['',Validators.required],
    });
  
    // console.log("dialog clicked "+localStorage.getItem('storyTitle'))
    if(localStorage.getItem('storyTitle')){
      this.actionBtn="Update"
      this.projectId=localStorage.getItem('projectId')!
      this.projectName=localStorage.getItem('storyProjectName')!
      this.storyForm.controls['projectId'].setValue(localStorage.getItem('projectId'))
      this.storyForm.controls['assignee'].setValue(localStorage.getItem('assignee'))
      this.storyForm.controls['assigneeEmail'].setValue(localStorage.getItem('assigneeEmail'))
      this.storyForm.controls['assignmentDate'].setValue(localStorage.getItem('assignmentDate'))
      this.storyForm.controls['remarks'].setValue(localStorage.getItem('remarks'))
      this.storyForm.controls['status'].setValue(localStorage.getItem('status'))
      this.storyForm.controls['storyDescription'].setValue(localStorage.getItem('storyDescription'))
      this.storyForm.controls['storyId'].setValue(localStorage.getItem('storyId'))
      this.storyForm.controls['storyTitle'].setValue(localStorage.getItem('storyTitle'))
      this.storyForm.controls['targetDate'].setValue(localStorage.getItem('targetDate'))

      localStorage.clear();
      localStorage.setItem('usertype',this.usertype)
      localStorage.setItem('storyProjectId',this.projectId)
      localStorage.setItem('storyProjectName',this.projectName)
      localStorage.setItem('checkemail',this.checkemail)
    }

  }
  addStory(){
    console.log(this.storyForm.value)
    if(this.storyForm.valid){
      this._service.postStory(this.storyForm.value).subscribe({
        next:(res)=>{
          alert("Action Successful.");
          this.storyForm.reset();
          this.dialogRef.close('save');
          window.location.reload();
        },
        error:()=>{
          alert("Error Occurred");
        }
      })
    }
  }

}
