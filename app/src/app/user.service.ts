import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  storeUser(username:string,userId:string){
    localStorage.setItem("username",username);
    localStorage.setItem("userId",userId);

  }

  getUserName(){
    return localStorage.getItem("username");
  }

  getUserId(){
    return localStorage.getItem("userId");
  }
  constructor() { }
}
