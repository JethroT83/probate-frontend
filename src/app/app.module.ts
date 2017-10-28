import { NgModule } from '@angular/core';

//Inmports
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { Routing }        from './app.routing';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

//Providers
import { AuthGuard } from './_guards/index';
import { AuthenticationService } from './_services/index';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  providers: [AuthGuard,
              AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
