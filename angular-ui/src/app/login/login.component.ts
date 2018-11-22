import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { LoginModel } from '../models/login.model';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: Router,
    private loginModel: LoginModel, private loginService: LoginService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Username: [null],
      Password: [null],
    });
  }

  userAuthentication(form: FormGroup){
    this.loginModel = new LoginModel();
    this.loginModel.email = this.form.value.Username;
    this.loginModel.password = this.form.value.Password;
    this.loginService.loginUser(this.loginModel)
    .then((data: any) => {
      if (data.message === "Login successful.") {
        localStorage.setItem("userName", this.loginModel.email);

        this.form.reset();
        this.route.navigate(['/home']);
      }
      else if (data.message === "Invalid request.") {
        alert("Please login with valid credentials.");
        this.form.reset();
      }      
      else {
        alert("Login failed!");
        this.form.reset();
      }
    }).catch((err: any) => {
      console.log(err);
      alert("Login failed!");
      this.form.reset();
    });
  }
}
