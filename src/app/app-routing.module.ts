import { Component, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
//import { LoginSuccessComponent } from './login-success/login-success.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ViewStoryComponent } from './view-story/view-story.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
},
// {
//   path:'loginSuccess',
//   component:LoginSuccessComponent
// },
{
  path:'adminLog',
  component:AdminLoginComponent
},
{
  path:'registration',
  component:RegistrationComponent
},
{
  path:'viewStory',
  component:ViewStoryComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
