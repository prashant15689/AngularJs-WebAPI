import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../SERVICES/user.service';
import { UsersModel } from '../models/users.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router:Router, private userService: UserService, private usersModel:UsersModel) { }

  users = [];

  ngOnInit() {    
    if(localStorage.length === 0){
      this.router.navigate(["/login"]);
    }else{
      this.getAllUsers();
    }
  }

  getAllUsers(){
      this.userService.getUserList().then((data: any) => {
        this.users = data.data;
      });
  }  
}
