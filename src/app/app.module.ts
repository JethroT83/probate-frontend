import { NgModule } from '@angular/core';

//Imports
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { Routing }        from './app.routing';
import { Ng4FilesModule } from 'angular4-files-upload';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

//Providers
import { AuthenticationService, AuthGuard, GeneralService} from './_services/index';
import { JwtHelper } from 'angular2-jwt';

//Directives
import { UploadComponent } from './home/submodules/upload/upload.component';
import { RunComponent } from './home/submodules/run/run.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing,
    Ng4FilesModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UploadComponent,
    RunComponent
  ],
  providers: [AuthGuard,
              AuthenticationService,
              JwtHelper,
              GeneralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
