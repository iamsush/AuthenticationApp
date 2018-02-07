import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  authToken : any;
  user : any;
  API : String = `users`;

  constructor(private http : HttpClient) { }

  registerUser(user) : Observable<any>{
    return this.http.post(`${this.API}/register`, user)
    .map(res => {
      return res;
    })
  }

  authenticateUser(user) : Observable<any>{
    return this.http.post(`${this.API}/authenticate`, user)
    .map(res =>{
      return res;
    })
  }

  getProfile() : Observable<any>{
    this.loadToken();
    const headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(`${this.API}/profile`, {headers})
    .map(res => {
      return res;
    })
  }

  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
