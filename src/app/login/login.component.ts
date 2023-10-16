import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User=new User();
  msg='';
  constructor(private _service:RegisterService,private _router:Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    console.log(this.user);
    this._service.loginUser(this.user).subscribe(data=>{

       //console.log(data.email);
       if(data==null){
        this.msg="Bad credentials, Please enter correct ID and Password";
       }
       else{
       localStorage.setItem('checkemail',data.email)
      localStorage.setItem('usertype',data.usertype);
      localStorage.setItem('isLoggedIn','true')
      localStorage.setItem('userId',data.userId)
      this._router.navigate(['adminLog']);
       }
      
    },
    error=>{
    this.msg="Bad credentials, Please enter correct ID and Password";}
    )

  }
  goToRegistration(){
    console.log("clicked register");
    this._router.navigate(['registration']);
  }
}
