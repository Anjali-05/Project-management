import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { User } from '../user';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user:User=new User();
  constructor(private _service:RegisterService,private _router:Router) { }

  ngOnInit(): void {
  }
  RegisterUser(){
    console.log("form clicked");
    this._service.registerUser(this.user).subscribe(data=>{
        console.log("Response received");
        alert("Registration succesfull");
        this._router.navigate(['/']);
      },
      error=>{
        console.log(error);
      }
    )
  }

}
