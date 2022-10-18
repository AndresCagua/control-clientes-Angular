import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import  Cliente  from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { PlacesService } from 'src/app/servicios/places.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
 
  createCliente: FormGroup;

  /*
  clientes: Cliente[];
  cliente: Cliente={
    nombre: '',
    apellido:'',
    email:'',
    saldo: 0
  }*/

  id:string | null;
  submitted: boolean;
  loading: boolean;
  
  constructor(private clientesServicio: ClienteServicio,
    //private flashMessages: FlashMessagesService,
    private router: Router,
    private aRoute: ActivatedRoute,
    //private placesService: PlacesService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    ) {
      this.createCliente = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', Validators.required],
        saldo: ['', Validators.required]
      })

     this.id = this.aRoute.snapshot.paramMap.get('id');

}

  ngOnInit(): void {
   
    this.esEditar();
    this.clientesServicio.getCliente(this.id);
    //console.log(this.id);
  }



agregarEditarCliente() {
  this.submitted = true;

  if (this.createCliente.invalid) {
    return;
  }

  if (this.id === null) {
    //this.agregarCliente();
    return
    
  } else {
    this.editarCliente(this.id);
  }

}

/*
agregarCliente() {
  const cliente: any = {
    nombre: this.createCliente.value.nombre,
    apellido: this.createCliente.value.apellido,
    email: this.createCliente.value.email,
    saldo: this.createCliente.value.saldo,
    fechaCreacion: new Date(),
    fechaActualizacion: new Date()
  }
  this.loading = true;
  this.clientesServicio.agregarEmpleado(cliente).then(() => {
    this.toastr.success('El empleado fue registrado con exito!', 'Empleado Registrado', {
      positionClass: 'toast-bottom-right'
    });
    this.loading = false;
    this.router.navigate(['/']);
  }).catch(error => {
    console.log(error);
    this.loading = false;
  })
}

*/

editarCliente(id: string) {

  const cliente: any = {
    nombre: this.createCliente.value.nombre,
    apellido: this.createCliente.value.apellido,
    email: this.createCliente.value.email,
    saldo: this.createCliente.value.saldo,      
    fechaActualizacion: new Date()
  }

  this.loading = true;

  this.clientesServicio.actualizarEmpleado(id, cliente).then(() => {
    this.loading = false;
    this.toastr.info('El empleado fue modificado con exito', 'Empleado modificado', {
      positionClass: 'toast-bottom-right'
    })
    this.router.navigate(['/']);
  })
}

esEditar() {
    //this.titulo = 'Editar Empleado'
    if (this.id !== null) {

      this.loading = true
      this.clientesServicio.getCliente(this.id).subscribe(data => {
        this.loading = false;
        console.log(this.loading)
        this.createCliente.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          email: data.payload.data()['email'],
          saldo: data.payload.data()['saldo'],
        })
      })
    }
  }

eliminarClienteModificado(){
  this.eliminarCliente_(this.id);
}

  eliminarCliente_(id: string) {
    if(confirm('Seguro que desea eliminar el cliente?')){
    this.clientesServicio.eliminarCliente(id).then(() => {
      console.log('empelado eliminado con exito');
      this.toastr.error('El empleado fue eliminado con exito', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/']);
    }).catch(error => {
      console.log(error);
    })
  }
  }
}
