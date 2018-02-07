import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'ngx-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name : String;
  username : String;
  email : String;
  password : String;

  constructor(private validateService : ValidateService,
    private flashMessage : FlashMessagesService,
    private authService :AuthService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name : this.name,
      username : this.username,
      email : this.email,
      password : this.password
    }

    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all the fields!', {
        classes: ['alert', 'alert-danger'],
        timeout: 3000,
      });
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please validate email!', {
        classes: ['alert', 'alert-danger'],
        timeout: 3000
      });
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are now registered and now can log in', {
          classes: ['alert', 'alert-success'],
          timeout: 3000
        });
        this.router.navigate(['/login']);
      }
      else{
        this.flashMessage.show(data.msg, {
          classes: ['alert', 'alert-danger'],
          timeout: 3000
        });
        this.router.navigate(['/register']);
      }
    })
  }

}
