import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Config} from './config.service';

@Injectable()
export class AuthenticationService {
  
  private headers  = new Headers({"Content-Type":"application/json"});

    constructor(private http: Http,
                public jwtHelper: JwtHelper,
                private config:Config) { }

    login(email:string, password:string) {

      let cred = JSON.stringify({email:email,password:password});

        return this.http.post(this.config.host + '/api/v1/auth/login', cred, {headers: this.headers})
            .map((response: Response) => {

                // login successful if there's a jwt token in the response
                let user = response.json();

                if (user && user.token) {

                    let token = 'Bearer ' + user.token;

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', token);
                }
            });

     }


    public isAuthenticated(): boolean {

      if(localStorage.getItem('currentUser')=== null){
        return false;
      }else{
        // true or false
        return !this.jwtHelper.isTokenExpired(localStorage.getItem('currentUser'));
       }
    }


     logout(){
       //remove user form local storage
       localStorage.removeItem('currentUser');
     }
}