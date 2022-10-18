import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { documentId, getDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import  Cliente  from "../modelo/cliente.model";
//import Place from '../interfaces/place.interface';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private firestore: Firestore) { }

  addPlace(place: Cliente) {
    const placeRef = collection(this.firestore, 'places');
    return addDoc(placeRef, place);
  }

  getPlaces(): Observable<Cliente[]> {
    const placeRef = collection(this.firestore, 'clientes');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Cliente[]>;
  }

  getId(cliente:Cliente){
    const clienteDocRef = doc(this.firestore, `clientes/${cliente.id}`);
    return getDoc
  }



  deleteCliente(cliente: Cliente) {
    
    const clienteDocRef = doc(this.firestore, `clientes/${cliente.id}`);
    console.log(`${cliente.id}`)
    return deleteDoc(clienteDocRef);
  }







 

  updateCliente(cliente:Cliente){
   /*
const placeDocRef = doc(this.firestore, `clientes/${cliente.id}`)
return updateDoc(placeDocRef);
console.log(cliente.id);
*/
  }

}
