import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse,HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {AppComponent} from '../app.component';
import { AuthenticationService } from './authentication.service';




@Injectable()
export class Interceptor implements HttpInterceptor {

  	constructor(public router: Router,
  				public auth: AuthenticationService){

  	}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (this.auth.isAuthenticated()) {
			req = req.clone({
				setHeaders: {
					'Authorization': 'Bearer ' + localStorage.getItem('currentUser'),
					'Content':'multipart/form-data'
				}
			});
		}


        return next.handle(req).do((event: HttpEvent<any>) => {

			// if the event is for http response
			/*if (event instanceof HttpResponse) {
				// stop our loader here
				this.loading = false;
				console.log(this.loading);
			}*/
        }, 
        (err: any) => {

            if (	err instanceof HttpErrorResponse 
            	&& 	(	err.status == 400
            		 || err.status == 401
            		 || err.status == 403)) {

                this.router.navigate(['login']);

            }

            //this.loading = false;
        });
    }
}