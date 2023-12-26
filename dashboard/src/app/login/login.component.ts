import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Response} from "../model/response";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgIf
  ],
  template: `
    <div class="isolate h-full min-h-screen bg-white">
      <!--      BackGround-->
      <div class="fixed inset-x-0 top-32 -z-10 transform-gpu overflow-hidden bg-fixed blur-xl md:top-8">
        <svg viewBox="0 0 1636 1030" xmlns="http://www.w3.org/2000/svg" overflow="hidden">
          <defs>
            <clipPath id="clip0"><rect x="0" y="0" width="1636" height="1030"/></clipPath>
            <linearGradient x1="1642.81" y1="11.1518" x2="-6.81238" y2="1018.85" gradientUnits="userSpaceOnUse" spreadMethod="reflect" id="fill1"><stop offset="0" stop-color="#06B6D4"/><stop offset="0.21" stop-color="#06B6D4"/><stop offset="0.46" stop-color="#DAE3F3"/>
              <stop offset="0.81" stop-color="#5785E5"/><stop offset="0.88" stop-color="#A855F7"/><stop offset="1" stop-color="#A855F7"/>
            </linearGradient>
          </defs>
          <g clip-path="url(#clip0)">
            <path d="M1300.24 1030 811.987 488.138 0 217.313C205.316 335.302-0.168834 204.552 183.36 596.554L650.416 155.7C652.569 373.801 748.624 818.133 899.443 793.626 1050.26 769.118 1435.99 74.2938 1555.33 8.65328 1674.67-56.9872 1630.56 268.125 1615.49 399.782L1224.91 224.8 1300.24 1030Z" fill="url(#fill1)" fill-rule="evenodd"/>
          </g>
        </svg>
      </div>

      <div class="h-screen flex flex-col justify-center items-center">
        <div class="rounded-lg bg-white bg-opacity-75 shadow-2xl w-3/5 h-3/5 flex flex-row justify-between">
          <div class="flex flex-col p-4 pl-8 pr-8 grow justify-center items-center">
            <div class="text-2xl font-bold mb-8">Log in</div>
            <input [(ngModel)]="username" class="h-12 bg-white border-2 rounded-lg p-2 mb-4 w-64" placeholder="Username">
            <input [(ngModel)]="password" type="password" class="h-12 bg-white border-2 rounded-lg p-2 w-64 mb-8" placeholder="Password">
            <button (click)="onLogin()" class="bg-blue-500 text-white hover:bg-blue-800 rounded-lg w-64 h-12">Continue</button>
            <div *ngIf="showError" class="text-red-500 relative bottom-0">{{errorMsg}}</div>
          </div>
          <div class="flex w-auto">
            <img class="rounded-r-lg relative right-0 h-full" src="https://w0.peakpx.com/wallpaper/538/622/HD-wallpaper-simple-abstract-black-blue-dark-galaxy-samsung.jpg">
            <div class="absolute p-4 text-white z-50">
              <div class="text-2xl font-bold">Clinicians</div>
              <div class="text-xl">Dashboard</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username:string = "";
  password:string = "";
  isLoading = false;

  showError = false;
  errorMsg = '';
  constructor(public userService: UserService,
              private route: ActivatedRoute,
              public router: Router,
              private http: HttpClient,) {
  }

  onLogin(){
    if(!this.isLoading){
      this.isLoading = true;
      this.http.post<Response>((environment.apiUrl+"/clinicians/login"),
        {username:this.username,
          password:this.password
        })
        .pipe()
        .subscribe(data=> {
            this.isLoading=false
            if(data.code==200){
              this.userService.storeUser(this.username,data.data)
              this.showError = false
              this.router.navigate(['/'])
            }
            else{
              this.errorMsg = data.msg
              this.showError = true
            }
            this.isLoading=false
          }
        )
    }
  }
}
