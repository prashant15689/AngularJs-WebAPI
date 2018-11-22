import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor() { }

  logOut(){
    localStorage.removeItem("userName");
  }
}
