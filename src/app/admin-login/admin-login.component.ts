import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectDetail } from '../project-detail';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { RegisterService } from '../register.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  compwindow:any;
  project!:ProjectDetail[]
  editData:ProjectDetail=new ProjectDetail();
  name:string="anjali"
  usertype:string=localStorage.getItem('usertype')!;
  displayedColumns: string[] = ['projectId', 'projectName', 'projectManagerName', 'projectStartDate','projectEndDate','status','action'];
  dataSource!: MatTableDataSource<any>;
  editClicked!: boolean
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,private _service:RegisterService,private _router:Router) { 
    this.compwindow=window;
  }

  ngOnInit()  {
    console.log(this.usertype);
    this._service.getProject().subscribe(data=>{
      console.log(data);
      this.project=data;
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
    
  }
  logout(){
    localStorage.setItem('isLoggedIn','false')
    localStorage.setItem('userId','null')
    this._router.navigate(['/']);
  }
  openDialog() {
    const dialogRef = this.dialog.open(ProjectDialogComponent,{
      width:'30%'
    })
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProject(row:any){
    this.editClicked=true;
    console.log("inside edit project")
    console.log(this.project)
    localStorage.setItem('projectId',row.projectId)
    
    localStorage.setItem('editClicked','true')
    console.log(row.projectId)
    for (const item of Object.entries(this.project)) {
      //console.log(item[1].projectId)
      if(item[1].projectId==row.projectId){
        this.editData=item[1]
        localStorage.setItem('projectName',this.editData.projectName)
        localStorage.setItem('projectDescription',this.editData.projectDescription)
        localStorage.setItem('projectManagerName',this.editData.projectManagerName)
        localStorage.setItem('projectManagerEmailId',this.editData.projectManagerEmailId)
        localStorage.setItem('projectStartDate',this.editData.projectStartDate)
        localStorage.setItem('projectEndDate',this.editData.projectEndDate)
        localStorage.setItem('remarks',this.editData.remarks)
        localStorage.setItem('status',this.editData.status)
        localStorage.setItem('teamName',this.editData.teamName)
        localStorage.setItem('teamSize',this.editData.teamSize)
        localStorage.setItem('techLeadName',this.editData.techLeadName)
        localStorage.setItem('techLeadEmailId',this.editData.techLeadEmailId)
        localStorage.setItem('techStack',this.editData.techStack)
        //this.projectDialog.projectDetail=this.editData
        console.log("editData")
        console.log(this.editData)
        break;
      }
    }
    this.dialog.open(ProjectDialogComponent,{
      width:'30%',
      data:row
    })
  }

  deleteProject(projectId:string){
    console.log("delete clicked for: "+projectId)
    this._service.deleteProject(projectId).subscribe(
      data=>{
        alert("Deletion Successfull for "+projectId)
        //window.location.reload();
        this.compwindow.location.reload();
      },
      error=>{
        alert("Deletion Unsuccessfull")
      }
    )
  }

  viewStory(row:any){
    console.log("clicked view story for "+row.projectId)
    localStorage.setItem('storyProjectId',row.projectId)
    localStorage.setItem('storyProjectName',row.projectName)
    this._router.navigate(['/viewStory'])
  }
 
}
