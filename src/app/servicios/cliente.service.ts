import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
//import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable} from "rxjs";
import Cliente  from "../modelo/cliente.model";
import {map } from 'rxjs/operators';
import { disableDebugTools } from "@angular/platform-browser";
import { updateDoc } from "firebase/firestore";


@Injectable()

export class ClienteServicio{

    clientesColeccion: AngularFirestoreCollection<Cliente>;
    clientes: Observable<Cliente[]>;
    //clientes: any;


    clienteDoc: AngularFirestoreDocument<Cliente>;
    cliente: Observable<Cliente>;
    
//
      

    constructor(private db: AngularFirestore){
        this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre','asc'));
        //console.log(this.clientesColeccion);
    }

    actualizarEmpleado(id: string, data:any): Promise<any> {
        return this.db.collection('clientes').doc(id).update(data);
      }
      agregarEmpleado(cliente: any): Promise<any> {
        return this.db.collection('clientes').add(cliente);
      }

    getClientes(): Observable<Cliente[]>{
        
        //Obtener los clientes
        

        this.clientes = this.clientesColeccion.snapshotChanges().pipe(
            map( cambios =>{
                return cambios.map(accion=>{
                    const datos = accion.payload.doc.data() as Cliente;
                    const id = accion.payload.doc.id;
                    
                    console.log(id);
                    return datos;
                })
            })
        );
        return this.clientes;

    }

    agregarCliente(cliente:Cliente){
        
        this.clientesColeccion.add(cliente);    

    }


    getCliente(id: string): Observable<any> {
       
        const prueba =this.db.collection('clientes').doc(id).snapshotChanges();this.db.collection('clientes').doc(id).snapshotChanges();
        console.log(prueba);
        return prueba
        
      }
    

    modificarCliente(cliente: Cliente){
        console.log(cliente.id);
        this.clienteDoc = this.db.doc<Cliente> (`clientes/${cliente.id}`);
        //this.clienteDoc=this.db.collection('clientes').doc(cliente.id);
        this.clienteDoc.update(cliente);

       
        
    }

    eliminarCliente(id: string): Promise<any> {
        return this.db.collection('clientes').doc(id).delete();
      }
}