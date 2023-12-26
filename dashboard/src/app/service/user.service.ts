import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  storeUser(username:string,token:string){
    localStorage.setItem("username",username);
    localStorage.setItem("token",token);
  }

  getUserName(){
    return localStorage.getItem("username");
  }


  getToken(){
    return localStorage.getItem("token");
  }
  logOut(){
    localStorage.setItem("username","");
    localStorage.setItem("token","");
  }
  constructor() { }
}
