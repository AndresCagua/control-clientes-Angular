import { Component, Injectable, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import  Usuario  from 'src/app/modelo/usuario.model';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';



@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})


@Injectable()
export class CabeceroComponent implements OnInit {
  
 isLoggedIn: boolean;
 
 authStateSubs: any;
loggedInUser: string;
  usuario:Usuario;
  permitirRegistro: boolean;
  
  constructor(private loginService:LoginService,
              private router: Router,
              public auth: AngularFireAuth,
              private configuracionServicio: ConfiguracionServicio
              ) {}

              
  ngOnInit(): void {
 /*
    this.loginService.setUsuario(this.usuario);
    // Nos suscribimos al Emitter del servicio que habíamos declarado con @Output,
    // y le decimos que persona sera lo que nos devuelva el observable de personaEmitter
    this.loginService.usuarioEmitter.subscribe(
      data => {
        this.usuario = data;
      }
    );
    

    if(this.loginService.isLogged()=== 'vacio'){
      this.isLoggedIn=false;
      console.log('entro por log out')
    }
    else{
      
      this.isLoggedIn=true;
      this.loggedInUser=this.loginService.isLogged()
      console.log('entro por login')
    }*/

    this.loginService.getAuth().subscribe( auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else{
        this.isLoggedIn = false;
      }
    });


    this.configuracionServicio.getConfiguracion().subscribe( configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro;
    })


  }

  onClickOut() {
    this.loginService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }


  

}
