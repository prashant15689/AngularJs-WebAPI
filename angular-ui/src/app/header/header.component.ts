import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../SERVICES/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName;
  constructor(private logoutService:LogoutService, private router:Router) { }

  ngOnInit() {
    this.userName = localStorage.getItem("userName");    
  }
  logOutUser(){
    this.logoutService.logOut();    
    this.router.navigate(['/login']);
  }
}
