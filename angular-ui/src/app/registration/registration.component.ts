import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { RegistrationModel } from '../models/registration.model';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: Router, private registrationService:RegistrationService,
    private registrationModel: RegistrationModel, ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      Name: [null],
      Email: [null],
      PhoneNumber: [null],
      Password: [null],
      ConfirmPassword:[null]
    });
  }

registerUser(form: FormGroup){
  this.registrationModel = new RegistrationModel();
  this.registrationModel.email= this.form.value.Email;
  this.registrationModel.name= this.form.value.Name;
  this.registrationModel.phoneNumber= this.form.value.PhoneNumber;
  this.registrationModel.password= this.form.value.Password;
  this.registrationService.createUser(this.registrationModel)
      .then((data: any) => {
        if (data.message === "You have successfully registered.") {
          alert("Registration successful!");
          this.form.reset();
          this.route.navigate(['/login']);
        }
        else if (data.message === "Invalid request.") {
          alert("Please try to register again.");
          this.form.reset();
        }
        else if (data.message === "Email/phone number already exists.") {
          alert("Email/phone number already exists.");
          this.form.reset();
        }
        else {
          alert("Registration failed!");
          this.form.reset();
        }
      }).catch((err: any) => {
        console.log(err);
        alert("Registration failed!");
        this.form.reset();
      });
  }
}
