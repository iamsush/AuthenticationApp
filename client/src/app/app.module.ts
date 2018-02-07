import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesModule } from 'ngx-flash-messages';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

import { ValidateService } from './services/validate/validate.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGaurd } from './gaurds/auth.gaurd';

const appRoutes : Routes = [
  {path : '', component : HomeComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'profile', component : ProfileComponent, canActivate : [AuthGaurd]},
  {path : 'dashboard', component : DashboardComponent, canActivate : [AuthGaurd]},
  {path : 'login', component : LoginComponent},
  {path : '**', redirectTo : ''}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
