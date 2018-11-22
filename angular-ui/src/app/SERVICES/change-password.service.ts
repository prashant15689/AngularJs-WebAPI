import { Injectable } from '@angular/core';
import { ChangePasswordModel } from '../models/change-password.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppGlobals } from '../app.global';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient, private appGlobals: AppGlobals) { }

  changePassword(changePasswordModel: ChangePasswordModel): Promise<Response> {
    debugger;
    const endPoint = this.appGlobals.baseAppUrl + this.appGlobals.ChangePasswordAPIUrl;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(endPoint, changePasswordModel, httpOptions).toPromise()
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
