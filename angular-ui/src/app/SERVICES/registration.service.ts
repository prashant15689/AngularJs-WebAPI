import { Injectable } from '@angular/core';
import { RegistrationModel } from '../models/registration.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Response } from '@angular/http';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private appGlobals:AppGlobals) {
  }
  createUser(registrationModel: RegistrationModel): Promise<Response> {
     const endPoint = this.appGlobals.baseAppUrl + this.appGlobals.registrationAPIUrl;
     const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };

    return this.http.post(endPoint, registrationModel, httpOptions).toPromise()
       .then(this.extractData)
       .catch(this.handleErrorPromise);
    }
    extractData(res: Response) {
      return res;
    }
    handleErrorPromise(error: Response | any) {
      console.error(error.message || error);
      return Promise.reject(error.message || error);
    }
}
