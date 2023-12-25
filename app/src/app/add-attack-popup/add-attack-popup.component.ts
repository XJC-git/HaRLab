import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule} from "@angular/forms";
import {NgxMatTimepickerComponent, NgxMatTimepickerDirective} from "ngx-mat-timepicker";
import {MatIconModule} from "@angular/material/icon";
import {Response} from "../model/response";
import {environment} from "../../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UserService} from "../user.service";
import {TimeService} from "../time.service";

@Component({
  selector: 'app-add-attack-popup',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    NgxMatTimepickerDirective,
    MatIconModule,
    NgxMatTimepickerComponent,
    HttpClientModule
  ],
  template: `
    <h1 mat-dialog-title>Report Attack</h1>
    <div mat-dialog-content>
      <mat-form-field class="w-64">
        <mat-label>Are you in the room?</mat-label>
        <mat-select [(ngModel)]="location">
          @for (c of choices; track c) {
          <mat-option [value]="c.value">{{c.value}}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field class="w-64">
        <mat-label>Attack date</mat-label>
        <input [(ngModel)]="date" matInput [matDatepicker]="picker">
        <mat-hint>MM/DD/YYYY</mat-hint>
        <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>
      <mat-form-field class="w-64">
        <mat-label>Attack time</mat-label>
        <mat-hint>hh:mm AM/PM</mat-hint>
        <input matInput
               name="selected_time_A"
               [format]="24"
               [(ngModel)]="time"
               [ngxMatTimepicker]="pickerA"
               placeholder="16:00"
               readonly
                />
        <mat-icon matSuffix
                  (click)="pickerA.open()"

        >
          watch_later
        </mat-icon>
      </mat-form-field>
      <ngx-mat-timepicker #pickerA floatLabel="never"></ngx-mat-timepicker>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button (click)="onSubmit()">Submit</button>
      <svg class="{{isLoading?'':'hidden'}} animate-spin -ml-1 mr-3 h-5 w-5 text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  `,
  styleUrl: './add-attack-popup.component.css'
})
export class AddAttackPopupComponent {
  location: string = "";
  date: Date = new Date();
  time: string = "";
  constructor(public dialogRef: MatDialogRef<AddAttackPopupComponent>,
              private http: HttpClient,
              private userService: UserService,
              private timeService:TimeService) {
  }
  selectedTime = ''
  choices = [{value:'inside'},{value:'outside'}]
  onNoClick(): void {
    this.dialogRef.close();
  }


  isLoading = false
  showError = false
  errorMsg = ''
  onSubmit(){

    this.http.post<Response>((environment.apiUrl+"/participants/addAttack"),
      {user_id:this.userService.getUserId(),
        time:this.timeService.parseToTimeStamp(this.date,this.time),
        location:this.location
      })
      .pipe()
      .subscribe(data=> {
          this.isLoading=false
          if(data.code==200||data.code==500){
            this.showError = false
            this.onNoClick()
          }
          else{
            this.errorMsg = data.msg
            this.showError = true
          }
        }
      )
  }
}
