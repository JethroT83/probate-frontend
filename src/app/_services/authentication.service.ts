
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
	
	private headers  = new Headers({"Content-Type":"application/json"});

    constructor(private http: Http) { }

    login(email:string, password:string) {

    	let cred = JSON.stringify({email:email,password:password});

      	return this.http.post('http://localhost:8000/api/v1/auth/login', cred, {headers: this.headers})
            .map((response: Response) => {

                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });

   	}


   	logout(){
   		//remove user form local storage
   		localStorage.removeItem('currentUser');
   	}
}