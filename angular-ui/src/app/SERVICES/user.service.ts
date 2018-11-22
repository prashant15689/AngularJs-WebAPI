import { Injectable } from '@angular/core';
import { AppGlobals } from '../app.global';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private appGlobals:AppGlobals) { }

  getUserList(): Promise<Response> {
    const endPoint = this.appGlobals.baseAppUrl + this.appGlobals.UserAPIUrl;
    const httpOptions = {
     headers: new HttpHeaders({
         'Content-Type': 'application/json'
       })
   };

   return this.http.get(endPoint).toPromise()
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
