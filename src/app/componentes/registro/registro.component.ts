import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: string;
  password: string;
  formReg: FormGroup;
  
  constructor(private router: Router,
    private flashMessages: FlashMessagesService,
    private loginService: LoginService

) {this.formReg = new FormGroup({
  email: new FormControl(),
  password: new FormControl()
}) }

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }

  registro(){
    console.log(this.formReg.value);
    this.loginService.registrarse(this.formReg.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

}
