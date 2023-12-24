import { Component } from '@angular/core';
import {DeviceUUIDService} from "../device-uuid.service";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Response} from "../model/response";
import {UserService} from "../user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule],
  template: `
    <div class="isolate h-full min-h-screen bg-white grid">
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
        <div class="flex text-5xl font-bold bg-gradient-to-br from-fuchsia-800 to-sky-300 bg-clip-text text-transparent tracking-wide leading-tight">
          Raynauds
        </div>
        <div class="text-3xl font-bold text-gray-700">
          matters to us
        </div>
        <div class="mt-8 mb-2 text-zinc-500">
          Please participant in our project
        </div>
        <div class="flex flex-row items-center w-56 rounded bg-zinc-300 transition hover:scale-110">
          <input class="bg-transparent p-1 pl-2 pr-2 focus:outline-none" (keydown)="handleSubmit($event)" placeholder="Enter your user name">
          <svg class="{{isLoading?'':'hidden'}} animate-spin -ml-1 mr-3 h-5 w-5 text-zinc-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <div class="{{showError?'':'hidden'}} text-red-500 text-center">{{errorMsg}}</div>
      </div>
    </div>
  `,
  styleUrl: './login.component.css',
  providers:[DeviceUUIDService,HttpClientModule]
})
export class LoginComponent {
  constructor(private deviceUUIDService : DeviceUUIDService,
              private http: HttpClient,
              private userService: UserService) {
  }


  isLoading = false;
  showError = false;
  errorMsg = '';


  handleSubmit(event:any){
    if (event.key === "Enter") {
      if(!this.isLoading){
        const curr_username = event.target.value
        this.http.post<Response>((environment.apiUrl+"/participants"),{username:curr_username,uuid:this.deviceUUIDService.getDeviceId()})
          .pipe()
          .subscribe(data=> {
            this.isLoading=false
            if(data.code==200||data.code==500){
              this.userService.storeUser(curr_username,data.data.toString())
              this.showError = false

            }
            else{
              this.errorMsg = data.msg
              this.showError = true
            }
          }
          )
      }
      this.isLoading = true;
    }
  }
}
