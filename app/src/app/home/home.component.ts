import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AddAttackPopupComponent} from "../add-attack-popup/add-attack-popup.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Response} from "../model/response";
import {environment} from "../../environments/environment";
import {NgForOf} from "@angular/common";
import {Attack} from "../model/attack";
import { TimeService } from '../time.service';
import {ActivatedRoute, Router} from "@angular/router";
import {EChartsOption} from "echarts";
import {NgxEchartsDirective, provideEcharts} from "ngx-echarts";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    NgForOf,
    HttpClientModule,
    NgxEchartsDirective,
  ],
  providers: [
    provideEcharts(),
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

      <div class="flex flex-row justify-between m-4">
        <div class="flex flex-col">
          <div class="text-zinc-500">
            Hello,
          </div>
          <div class="text-4xl">
            {{username}}
          </div>
          <button class="rounded-lg border-2 text-gray-500" (click)="userService.logOut();router.navigate(['/login'])">Log out</button>
        </div>
        <div class="flex">
          <button (click)="openPopup()" class="rounded-full bg-blue-500 w-16 h-16 text-white text-4xl shadow-2xl hover:bg-blue-800">+</button>
        </div>
      </div>

      <div class="pl-4 font-bold text-lg">Today</div>
      <div class="pl-4 text-zinc-500">Attacks you reported to us</div>
      <div class="mt-2 ml-2 mr-2 rounded-lg bg-white bg-opacity-75 h-48 shadow-2xl p-4 pl-2 pr-2 flex flex-col gap-y-2 overflow-auto">
        <div class="flex flex-row gap-4 shadow-lg justify-between items-center rounded-lg bg-purple-100 text-purple-900 p-2" *ngFor="let data of todayData">
          <div class="flex">{{timeService.parseTimeStamp(data.time).date}}</div>
          <div class="flex">{{timeService.parseTimeStamp(data.time).time}}</div>
          <div class="flex grow">{{data.location}}</div>
          <div class="flex gap-2">
            <button class="rounded-lg bg-purple-500 text-white h-8 pl-2 pr-2 hover:bg-purple-800">Edit</button>
            <button class="rounded-lg bg-red-500 text-white h-8 pl-2 pr-2 hover:bg-red-800">Delete</button>
          </div>
        </div>
      </div>

      <div class="pt-8 pl-4 font-bold text-lg">History</div>
      <div class="pl-4 text-zinc-500">Attacks in past 7 days</div>
      <div echarts [options]="options" [merge]="merge" class="demo-chart"></div>


    </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  isLoading = true;
  todayData:Attack[]=[];
  weekData = {};
  constructor(public userService: UserService,
              public dialog: MatDialog,
              private http: HttpClient,
              public timeService: TimeService,
              private route: ActivatedRoute,
              public router: Router) {
  }

  ngOnInit(): void {
    if(this.userService.getUserName()==""){
      this.router.navigate(['/login']);
    }
    this.loadData()
  }

  username = this.userService.getUserName()


  openPopup(){
    const dialogRef = this.dialog.open(AddAttackPopupComponent);
    dialogRef.afterClosed().subscribe(()=>this.loadData())
  }

  loadData(){
    const current = new Date();
    current.setHours(0)
    current.setMinutes(0)
    current.setSeconds(0)
    current.setMilliseconds(0)
    const timestamp = current.getTime();
    this.http.post<Response>((environment.apiUrl+"/participants/todayAttacks"),
      {user_id:this.userService.getUserId(),
        time:timestamp
      })
      .pipe()
      .subscribe(data=> {
          this.isLoading=false
          if(data.code==200){
            this.todayData = data.data
          }
        }
      )

    this.http.post<Response>((environment.apiUrl+"/participants/weekAttacks"),
      {user_id:this.userService.getUserId(),
        time:timestamp
      })
      .pipe()
      .subscribe(data=> {
          this.isLoading=false
          if(data.code==200){
            this.weekData = data.data
            this.merge={
              series: [
                {
                  // @ts-ignore
                  data: this.weekData.count,
                  type:"bar"
                },
              ],
              xAxis: {
                type: 'category',
                // @ts-ignore
                data: this.weekData.date.map((d:number)=>this.timeService.parseTimeStamp(d).date.slice(0,5)),
              },
              yAxis: {type: 'value'},
            }

            console.table(this.merge)
          }
        }
      )




  }

  merge: EChartsOption={}
  options: EChartsOption = {
    series: [
      {
        data: [3,3,0,6,2,5,0],
        type:"bar"
      },
    ],

    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],},
    yAxis: {type: 'value'},

  };
}
