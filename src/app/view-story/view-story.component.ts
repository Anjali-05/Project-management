import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { StoryDialogComponent } from '../story-dialog/story-dialog.component';
import { RegisterService } from '../register.service';
import { story } from '../story';


@Component({
  selector: 'app-view-story',
  templateUrl: './view-story.component.html',
  styleUrls: ['./view-story.component.css']
})
export class ViewStoryComponent implements OnInit {
  compwindow:any;
  projectId:string="";
  projectName:string="";
  checkemail:string=localStorage.getItem('checkemail')!;
  story!:story[]
  story1!:story
  usertype:string=localStorage.getItem('usertype')!;
  displayedColumns: string[] = ['storyId', 'storyTitle', 'assignee', 'assignmentDate','targetDate','status','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _router:Router,private dialog:MatDialog,private _service: RegisterService) { 
    this.compwindow=window;
  }

  ngOnInit(): void {
    this.projectId=localStorage.getItem('storyProjectId')!
    this.projectName=localStorage.getItem('storyProjectName')!
    console.log("story"+localStorage.getItem('storyProjectId'))
    console.log(localStorage.getItem('checkemail'));
    this.getstory(this.projectId)
    
  }
  //  windowReload(){
  //   window.location.reload();
  // }
  logout(){
    localStorage.setItem('isLoggedIn','false')
    localStorage.setItem('userId','null')
    this._router.navigate(['/']);
  }
  openDialog(){
    this.dialog.open(StoryDialogComponent, {
      width:'30%'
    });
  }

  getstory(projectId:string){
    this._service.getStorytByProjectId(projectId).subscribe(data=>{
      console.log(data)
      this.story=data;
      //console.log("story data"+this.story[1].storyTitle)
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    }
  )
  }
  editStory(row:any){
    console.log("edit clicked for story "+row.storyId)
    for(const item of Object.entries(this.story)){
      console.log(item[1].storyId)
      if(item[1].storyId==row.storyId){
        console.log(item[1].projectId)
        this.story1=item[1];
        localStorage.setItem('projectId',this.story1.projectId)
        localStorage.setItem('storyId',this.story1.storyId)
        localStorage.setItem('storyTitle',this.story1.storyTitle)
        localStorage.setItem('assigneeEmail',this.story1.assigneeEmail)
        localStorage.setItem('storyDescription',this.story1.storyDescription)
        localStorage.setItem('assignmentDate',this.story1.assignmentDate)
        localStorage.setItem('targetDate',this.story1.targetDate)
        localStorage.setItem('remarks',this.story1.remarks)
        localStorage.setItem('status',this.story1.status)
        localStorage.setItem('assignee',this.story1.assignee)
        break;
      }
    }
    this.dialog.open(StoryDialogComponent,{
      width:'30%'
    })
    
  }
  deleteStory(storyId:string){
    console.log("delete clicked for"+storyId)
    this._service.deleteStory(storyId).subscribe(
      data=>{
        alert("Deletion Successfull for "+storyId)
        //window.location.reload();
        //this.windowReload();
        this.compwindow.location.reload();
      },
      error=>{
        alert("Deletion Unsuccessfull")
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  }


