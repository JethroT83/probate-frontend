import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { NgForm }   from '@angular/forms';
import { Credentials }    from '../_models/index';
import { AuthenticationService } from '../_services/index';


@Injectable()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.scss','./login.component.scss']
})


export class LoginComponent implements OnInit {

  private cred     = new Credentials(null,null);
  private data;
  private returnUrl;
  private loading;

  constructor(private _http: Http,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService
    ){}

  ngOnInit(){

     // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onClick(){}


  onSubmit(form:NgForm){

    this.loading = true;

    this.authenticationService.login(this.cred.email, this.cred.password)
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                //this.alertService.error(error);
                this.loading = false;
            });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
