import { NgModule } from '@angular/core';
import {  FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
//import { LoginSuccessComponent } from './login-success/login-success.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ViewStoryComponent } from './view-story/view-story.component';
import { StoryDialogComponent } from './story-dialog/story-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    //LoginSuccessComponent,
    AdminLoginComponent,
    ProjectDialogComponent,
    ViewStoryComponent,
    StoryDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // FormBuilder,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports:[MatFormFieldModule],
  providers: [AdminLoginComponent,ProjectDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
