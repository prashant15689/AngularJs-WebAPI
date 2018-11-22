import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ApplicationRoutes} from './app.route';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModel } from './models/login.model';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationModel } from './models/registration.model';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppGlobals } from './app.global';
import { UsersModel } from './models/users.model';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordModel } from './models/change-password.model';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ApplicationRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginModel,
    RegistrationModel,
    AppGlobals,
    UsersModel,
    ChangePasswordModel
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
