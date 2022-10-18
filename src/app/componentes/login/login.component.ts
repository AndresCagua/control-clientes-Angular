import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessage } from 'angular2-flash-messages/module/flash-message';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  formLogin: FormGroup;
  login:boolean

  constructor(private router: Router,
              private flashMessages: FlashMessagesService,
              private loginService: LoginService) {
                this.formLogin = new FormGroup({
                  email: new FormControl(),
                  password: new FormControl()
                })
   
              }

  ngOnInit(): void {
    
    }



  
/*
  login(){
    this.loginService.login(this.email, this.password)
    .then( response => {
      this.router.navigate(['/']);
    })
    .catch(error =>{
      this.flashMessages.show(error.message, {
        cssClass: 'alert-danger', timeout:4000
      });
    });
  }*/

  onSubmit() {
    this.loginService.login(this.formLogin.value)
      .then(response => {
       // console.log(response.operationType);
        //console.log(response.user.email);
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }

  
}
