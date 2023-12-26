import {Component, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatTimepickerComponent, NgxMatTimepickerDirective} from "ngx-mat-timepicker";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DeleteData} from "../delete-attack-popup/delete-attack-popup.component";
import {Response} from "../model/response";
import {environment} from "../../environments/environment";
import {TimeService} from "../time.service";

export interface EditData{
  id:number;
  location:string;
  date:Date;
  time:string;
}
@Component({
  selector: 'app-edit-attack-popup',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    NgxMatTimepickerComponent,
    NgxMatTimepickerDirective, HttpClientModule
  ],
  template: `
    <h1 mat-dialog-title>Edit Attack</h1>
    <div mat-dialog-content>
      <mat-form-field class="w-64">
        <mat-label>Are you in the room?</mat-label>
        <mat-select [(ngModel)]="this.data.location">
          @for (c of choices; track c) {
          <mat-option [value]="c.value">{{c.value}}</mat-option>
          }
        </mat-select>
      </mat-form-field>
      <mat-form-field class="w-64">
        <mat-label>Attack date</mat-label>
        <input [(ngModel)]="this.data.date" matInput [matDatepicker]="picker">
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
               [(ngModel)]="this.data.time"
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
      <ngx-mat-timepicker #pickerA ></ngx-mat-timepicker>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button (click)="onEdit()">Submit</button>
      <svg class="{{isLoading?'':'hidden'}} animate-spin -ml-1 mr-3 h-5 w-5 text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  `,
  styleUrl: './edit-attack-popup.component.css'
})
export class EditAttackPopupComponent {
  choices = [{value:'inside'},{value:'outside'}]
  constructor(public dialogRef: MatDialogRef<EditAttackPopupComponent>,
              private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: EditData,
              private timeService:TimeService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEdit(){
      this.http.post<Response>((environment.apiUrl+"/participants/editAttack"),
          {id:this.data.id,
              time:this.timeService.parseToTimeStamp(this.data.date,this.data.time),
              location:this.data.location
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
  isLoading = false;
  showError = false;
  errorMsg = ''

}
