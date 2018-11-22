import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordModel } from '../models/change-password.model';
import { ChangePasswordService } from '../SERVICES/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: Router,
    private changePasswordModel: ChangePasswordModel, private changePasswordService: ChangePasswordService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      OldPassword: [null],
      NewPassword: [null],
      ConfirmPassword: [null]
    });
  }

  changeUserPassword(form: FormGroup) {
    debugger;
    this.changePasswordModel.email = localStorage.getItem("userName");
    this.changePasswordModel.oldPassword = this.form.value.OldPassword;
    this.changePasswordModel.newPassword = this.form.value.NewPassword;
    this.changePasswordService.changePassword(this.changePasswordModel)
      .then((data: any) => {
        if (data.message === "Password successfully changed.") {
          alert("Password successfully changed.");
          this.form.reset();
          localStorage.removeItem("userName");
          this.route.navigate(['/login']);;
        }
        else if (data.message === "Invalid request.") {
          alert("Please try to change password again.");
          this.form.reset();
        }
        else if (data.message === "Invalid old passowrd.") {
          alert("Invalid old passowrd.");
          this.form.reset();
        }
        else {
          alert("Change password action failed!");
          this.form.reset();
          localStorage.removeItem("userName");
          this.route.navigate(['/login']);;
        }
      }).catch((err: any) => {
        console.log(err);
        alert("Change password action failed!");
        this.form.reset();
        localStorage.removeItem("userName");
        this.route.navigate(['/login']);;
      });
  }

}
