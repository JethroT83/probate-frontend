import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm }   from '@angular/forms';
import { Credentials }    from './payload/credentials';

@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  private cred = new Credentials(null,null);
  private headers = new Headers({"Content-Type": "application/json"});
  private data;

  constructor(private _http: Http){}
  ngOnInit() {}
  onClick(){}


  onSubmit(form: NgForm): Promise<any> {
    if(this.cred.email.length > 0 && this.cred.password.length> 0){

      return this._http.post('http://localhost:8000/api/v1/auth/login', this.cred, {headers: this.headers})
            .toPromise()
            .then(res => {
              console.log(res)
            })
            .catch(this.handleError);
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
