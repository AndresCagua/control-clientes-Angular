import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import  Cliente  from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { LoginService } from 'src/app/servicios/login.service';
import { PlacesService } from 'src/app/servicios/places.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clienteForm_: FormGroup;
  clientes: Cliente[];
  cliente: Cliente={
    nombre: '',
    apellido:'',
    email:'',
    saldo: 0
  }
  user:string;
  @ViewChild("clienteForm") clienteForm:NgForm;
  @ViewChild("botonCerrar") botonCerrar:ElementRef;

  constructor(private clientesServicio: ClienteServicio,
              private flashMessages: FlashMessagesService,
              private placesService: PlacesService,
              private fb: FormBuilder,
              private loginService: LoginService,
              private toastr: ToastrService
              ) { 
                this.clienteForm_ = this.fb.group({
                  nombre: ['', Validators.required],
                  apellido: ['', Validators.required],
                  email: ['', Validators.required],
                  saldo: ['', Validators.required]
                })
              }

  ngOnInit(): void {
    //console.log(this.cliente.id);
    this.placesService.getPlaces().subscribe(
      clientes => {
              this.clientes =clientes;
              //console.log(this.clientes) ;  
              //console.log(this.cliente.id);      
      }
    );
   //this.user = this.loginService.isLogged();
  }

   getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes){
      this.clientes.forEach( cliente =>{
        saldoTotal += cliente.saldo;
      })
    }
    return saldoTotal;
  }

  async agregar({value,valid}:{value:Cliente, valid:boolean}){
      if(!valid){
        this.flashMessages.show('Por favor llena el formulario correctamente',{
          cssClass: 'alert-danger', timeout:4000
        });
      }
      else{
        //Agregar el nuevo cliente
        const cliente: any = {
          nombre: this.clienteForm_.value.nombre,
          apellido: this.clienteForm_.value.apellido,
          email: this.clienteForm_.value.email,
          saldo: this.clienteForm_.value.saldo,      
          fechaCreacion: new Date(),
          fechaActualizacion: new Date()
        }
        
        this.clientesServicio.agregarCliente(value);
        this.clienteForm.resetForm();
        this.cerrarModal();
      }
      this.toastr.success('El empleado fue registrado con exito!', 'Empleado Registrado', {
        positionClass: 'toast-bottom-right'
      });
  }
  
  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

  async onClickDelete(cliente: Cliente) {
    if(confirm('Seguro que desea eliminar el cliente?')){
    const response = await this.placesService.deleteCliente(cliente);
    //console.log(response);
  }
  this.toastr.error('El empleado fue eliminado con exito', 'Registro eliminado!', {
    positionClass: 'toast-bottom-right'
  });
  }
}