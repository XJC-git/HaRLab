import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  public parseTimeStamp(timestamp:number){
    let date = new Date(timestamp);
    let temp_h = date.getHours()
    let temp_m = date.getMinutes()
    let h=""
    let m =""
    if(temp_h<10){h = "0"+temp_h.toString()}
    else{h = temp_h.toString()}
    if(temp_m<10){m = "0"+temp_m.toString()}
    else{m=temp_m.toString()}
    return {
      date:date.toLocaleDateString(),
      time:h+":"+m
    }
  }

  public parseToTimeStamp(date:Date,time:string){
    let parseList = date.toLocaleDateString().split('/')
    let parseDate = parseList[2]+'-'+parseList[0]+'-'+parseList[1]+'T'+time
    return Date.parse(parseDate);
  }

    public parseToTimeStampWithString(date:string,time:string){
        let parseList = date.split('/')
        let parseDate = parseList[2]+'-'+parseList[0]+'-'+parseList[1]+'T'+time
        return Date.parse(parseDate);
    }
}
