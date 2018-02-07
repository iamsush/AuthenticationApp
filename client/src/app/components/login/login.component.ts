import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'ngx-flash-messages'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : String;
  password : String;
  constructor(
    private authService : AuthService,
    private router : Router,
    private flashMessage : FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username : this.username,
      password : this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {
          classes : ['alert', 'alert-success'],
          timeout : 5000
        })
        this.router.navigate(['/dashboard'])
      }
      else{
        this.flashMessage.show(data.msg, {
          classes : ['alert', 'alert-danger'],
          timeout : 5000
        });
        this.router.navigate(['/login']);
      }
    });
  }
}
