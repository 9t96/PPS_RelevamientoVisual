import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Reaccion } from 'src/app/shared/clases/reaccion';
import { eReaccion } from 'src/app/shared/enum/eReaccion';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase';
 
@Injectable({
  providedIn: 'root'
})
export class ReaccionesService implements OnInit {

  public dbRef: AngularFirestoreCollection<any>;
  public currentUid :string;
  constructor(    private db: AngularFirestore,
    private authService: AuthService,
    private fStorage: AngularFireStorage) { 
      this.dbRef = this.db.collection("reacciones");
    }

    ngOnInit(){
      const user$ = this.authService.getCurrentUserId().subscribe( data => {
        this.currentUid = data.uid;
      })
    }
  
  getReacciones(): Observable<Reaccion[]>{
    return this.dbRef.valueChanges({idField: 'reaction_id'});
  }

  //Se agrega reaccion a un reporte 
  updateReacciones(report_id: string, newValue: number, currentUid:string){
    this.dbRef.doc(`${report_id}`).update({likes: newValue, votantes: firebase.firestore.FieldValue.arrayUnion(currentUid)});
  }

  createReaccion(report_id:string){
    this.dbRef.doc(`${report_id}`).set({likes: 0, votantes: ['asd']})
  }
}
