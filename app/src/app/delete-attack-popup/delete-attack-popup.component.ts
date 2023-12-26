import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Response} from "../model/response";
import {environment} from "../../environments/environment";

export interface DeleteData{
  id:number;
}
@Component({
  selector: 'app-delete-attack-popup',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatButtonModule,
    MatDialogActions,
    MatFormFieldModule,
    HttpClientModule
  ],
  template: `
    <h1 mat-dialog-title>Delete Attack</h1>
    <mat-label class="ml-4 mr-4">Are you sure to delete this record?</mat-label>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button (click)="onDelete()">Delete</button>
      <svg class="{{isLoading?'':'hidden'}} animate-spin -ml-1 mr-3 h-5 w-5 text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  `,
  styleUrl: './delete-attack-popup.component.css'
})
export class DeleteAttackPopupComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAttackPopupComponent>,
              private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: DeleteData,) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  isLoading = false;

  onDelete(){
    this.http.post<Response>((environment.apiUrl+"/participants/deleteAttack"),
      {id:this.data.id
      })
      .pipe()
      .subscribe(data=> {
          this.isLoading=false
          this.onNoClick()
        }
      )
  }
}
