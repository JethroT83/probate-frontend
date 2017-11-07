import { NgModule } from '@angular/core';

//Imports
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { Routing }        from './app.routing';
import { Ng4FilesModule } from 'angular4-files-upload';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

//Providers
import { AuthGuard } from './_guards/index';
import { AuthenticationService, ToolBoxService} from './_services/index';

//Directives
import { UploadComponent } from './_directives/upload/upload.component';
import { RunComponent } from './_directives/run/run.component';


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
              ToolBoxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
