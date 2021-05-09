import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reporte } from 'src/app/shared/clases/reporte';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public dbRef: AngularFirestoreCollection<Reporte>;

  constructor(public firestore: AngularFirestore) { 
    this.dbRef = this.firestore.collection("reportes");
  }


  getReports(): Observable<Reporte[]>{
    return this.dbRef.valueChanges({idField: 'doc_id'});
  }
}
