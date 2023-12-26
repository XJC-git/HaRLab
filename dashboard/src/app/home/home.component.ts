import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserWithAlert} from "../model/userWithAlert";
import {environment} from "../../environments/environment";
import {Response} from "../model/response";
import {TimeService} from "../service/time.service";
import {EChartsOption} from "echarts";
import {NgxEchartsDirective, provideEcharts} from "ngx-echarts";
import {Attack} from "../model/attack";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        HttpClientModule,
        NgOptimizedImage,
        FormsModule,
        NgForOf,
        NgxEchartsDirective
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
        <div class="sticky top-0 flex flex-col rounded-lg bg-white bg-opacity-75 h-screen max-w-md min-w-md shadow-2xl p-4">
          <div class="text-zinc-500">
            Hello,
          </div>
          <div class="text-4xl mb-2">
            {{userService.getUserName()}}
          </div>
          <button class="rounded-lg border-2 text-gray-500" (click)="userService.logOut();router.navigate(['/login'])">Log out</button>
          <div class="mt-4 mb-2 rounded-lg bg-purple-100 p-2">Participants</div>
          <div class="flex flex-col gap-2">
            <div (click)="currentParticipant=participant.userId;loadParticipantData()" class="rounded-lg bg-white border-2 flex flex-row p-2 items-center justify-between hover:bg-zinc-300 {{currentParticipant==participant.userId?'bg-zinc-200':''}} {{participant.alert?'border-red-500':''}}" *ngFor="let participant of userList">
              <div>{{participant.username}}</div>
              <div>
                <div class="text-zinc-500 text-xs">Last Report: {{timeService.parseTimeStampToDescription(participant.lastReport,timeStampNow)}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col grow p-4">
            <div>Participant Name</div>
            <div class="text-xl font-bold">{{currentParticipantName}}</div>
            <div>History in past 7 days</div>
            <div echarts [options]="options" [merge]="merge" class="demo-chart"></div>
            <div>Attack Records</div>
            <div class="mt-2 ml-2 mr-2 rounded-lg bg-white bg-opacity-75 shadow-2xl p-4 pl-2 pr-2 flex flex-col gap-y-2 overflow-auto">
                <div class="flex flex-row gap-4 shadow-lg justify-between items-center rounded-lg bg-purple-100 text-purple-900 p-2" *ngFor="let data of currentParticipantAttacks">
                    <div class="flex">{{timeService.parseTimeStamp(data.time).date}}</div>
                    <div class="flex">{{timeService.parseTimeStamp(data.time).time}}</div>
                    <div class="flex grow">{{data.location}}</div>
                </div>
                <div class="flex flex-row justify-end items-center p-4 pb-2 gap-2">
                    <div>{{recordsCount}} records</div>
                    <button (click)="currentPage=currentPage-1;loadParticipantAttacks()" class="border-2 bg-white hover:bg-zinc-300 rounded-lg w-8 h-8 text-center disabled:bg-zinc-300" [disabled]="currentPage==0">\<</button>
                    <div>{{currentPage+1}}/{{totalPage}}</div>
                    <button (click)="currentPage=currentPage+1;loadParticipantAttacks()" class="border-2 bg-white hover:bg-zinc-300 rounded-lg w-8 h-8 text-center disabled:bg-zinc-300" [disabled]="currentPage+1==totalPage">\></button>
                </div>
            </div>
        </div>
      </div>

    </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  isLoading = false;

  userList:UserWithAlert[] = []

  currentParticipant = 2;
  currentParticipantName = "";

  timeStampNow = 0;
  constructor(public userService: UserService,
              private route: ActivatedRoute,
              public router: Router,
              private http: HttpClient,
              public timeService:TimeService) {
  }
  ngOnInit(): void {
    if(this.userService.getUserName()==""){
      this.router.navigate(['/login']);
    }
    this.loadData()
  }

  loadData(){
    const current = new Date();
    const timestamp = current.getTime();
    this.timeStampNow = new Date().getTime();
    let headers = new HttpHeaders({
      // @ts-ignore
      'Authorization': this.userService.getToken() });
    let options = { headers: headers };
    this.http.post<Response>((environment.apiUrl+"/clinicians/participants-list"),
      {date:timestamp
      },options)
      .pipe()
      .subscribe(data=> {
          this.isLoading=false
          if(data.code==200){
            this.userList = data.data
              this.loadParticipantData()
          }
          else{
            this.router.navigate(['/login']);
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

    currentParticipantAttacks:Attack[] = []
    totalPage = 0;
    currentPage = 0;
    pageSize = 10;
    recordsCount = 0;
  loadParticipantData(){
      for (let i = 0; i < this.userList.length; i++) {
          if(this.userList[i].userId==this.currentParticipant){
            this.currentParticipantName = this.userList[i].username;
            break;
          }

      }
      const current = new Date();
      current.setHours(0)
      current.setMinutes(0)
      current.setSeconds(0)
      current.setMilliseconds(0)
      this.http.post<Response>((environment.apiUrl+"/participants/weekAttacks"),
          {user_id:this.currentParticipant,
              time:current.getTime()
          })
          .pipe()
          .subscribe(data=> {
                  this.isLoading=false
                  if(data.code==200){
                      this.merge={
                          series: [
                              {
                                  // @ts-ignore
                                  data: data.data.count,
                                  type:"bar"
                              },
                          ],
                          xAxis: {
                              type: 'category',
                              // @ts-ignore
                              data: data.data.date.map((d:number)=>this.timeService.parseTimeStamp(d).date.slice(0,5)),
                          },
                          yAxis: {type: 'value'},
                      }

                      console.table(this.merge)
                  }
              }
          )

      this.loadParticipantAttacks();
  }

  loadParticipantAttacks(){
      this.http.post<Response>((environment.apiUrl+"/participants/allAttacks"),
          {userId:this.currentParticipant,
              page:this.currentPage,
              size:this.pageSize
          })
          .pipe()
          .subscribe(data=> {
                  this.isLoading=false
                  if(data.code==200){
                      this.currentParticipantAttacks = data.data.content;
                      // @ts-ignore
                      this.totalPage = data.data.totalPages;
                      this.recordsCount = data.data.totalElements;
                      this.loadParticipantData()
                  }
              }
          )
  }

    protected readonly Date = Date;
}
