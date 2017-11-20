import { NgModule } from '@angular/core';

//Imports
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { Routing }        from './app.routing';
import { Ng4FilesModule } from 'angular4-files-upload';
import { LoadingModule } from 'ngx-loading';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

//Providers
import { AuthenticationService,AuthGuard,GeneralService,Interceptor,Config} from './_services/index';
import { JwtHelper } from 'angular2-jwt';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

//Directives
import { UploadComponent } from './home/submodules/upload/upload.component';
import { RunComponent } from './home/submodules/run/run.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    Routing,
    Ng4FilesModule,
    LoadingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UploadComponent,
    RunComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, 
                useClass:Interceptor,
                multi: true},

              AuthGuard,
              AuthenticationService,
              JwtHelper,
              GeneralService,
              Config],
  bootstrap: [AppComponent]
})
export class AppModule { }
