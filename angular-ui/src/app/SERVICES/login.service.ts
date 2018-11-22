import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private appGlobals:AppGlobals) {
  }
  loginUser(loginModel: LoginModel): Promise<Response> {
     const endPoint = this.appGlobals.baseAppUrl + this.appGlobals.loginAPIUrl;
     const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };

    return this.http.post(endPoint, loginModel, httpOptions).toPromise()
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
