import { EventEmitter, Injectable, Output } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, authState } from '@angular/fire/auth';
import {map} from 'rxjs/operators'
import  Usuario  from "../modelo/usuario.model";
//import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()

export class LoginService{
    email: string;

  prueba: string;
    usuario: Usuario;
    @Output()
    usuarioEmitter = new EventEmitter<Usuario>();
   
    constructor(private auth: Auth,
        public afAuth: AngularFireAuth,
        ){
        }
      
setUsuario(nuevoUsuario: Usuario) {
            this.usuario = nuevoUsuario;
            //this.isLogged()
          }

/*
isLogged(){
   
      this.usuarioEmitter.emit(this.usuario);
      
        authState(this.auth).subscribe((response) =>  {
              // console.log(response);
               
               if (response === null) {
                   //execute
                   //console.log('vacio');
                   this.prueba = 'vacio'
               }
               else{
                   this.prueba = response.email
                   //console.log(this.prueba)
               }
               //console.log(this.prueba);
               this.prueba=this.usuario.email;
              return this.prueba
           });
           
           
           return this.prueba
        }
*/


        getAuth(){
          return this.afAuth.authState.pipe(
              map( auth => auth)
          );
      }

async login({ email, password }: any) {
   
            return await signInWithEmailAndPassword(this.auth, email, password);
          }
    
          

async logout() {
           
            return await signOut(this.auth);
          }


          registrarse({ email, password }: any) {
            return createUserWithEmailAndPassword(this.auth, email, password);
          }
        

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
             }
                    
   


    login(email: string, password:string){
        return new Promise((resolve,reject)=>{
            this.authService.authState.signInWithEmailAndPassword(email,password)
            .then(datos => resolve(datos),
            error => reject(error)
            )
        })
    }

  getAuth(){
    return this.authService.authState.pipe(
        map( auth => auth)
    );
  }
*/





