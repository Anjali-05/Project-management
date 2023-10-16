import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {  MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select'
import { StoryDialogComponent } from './story-dialog.component';
import {  MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterService } from '../register.service';
import {of} from 'rxjs';
import { story } from '../story';

describe('StoryDialogComponent', () => {
  let component: StoryDialogComponent;
  let fixture: ComponentFixture<StoryDialogComponent>;
  let service:RegisterService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,HttpClientModule,MatDialogModule,MatSelectModule,MatFormFieldModule,MatInputModule,BrowserAnimationsModule],
      providers:[
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide:RegisterService
        }
      ],
      declarations: [ StoryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryDialogComponent);
    service=TestBed.inject(RegisterService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
