
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_services/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(appRoutes);