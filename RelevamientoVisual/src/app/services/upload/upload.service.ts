import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { AuthService } from "../auth.service";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { Tipo } from "src/app/shared/enum/Tipo";
import { storage } from "firebase";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  newName: string;
  dbRef: AngularFirestoreCollection<any>;
  currentUid: string;
  timeStamp: Number;
  fullName: string;
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private fStorage: AngularFireStorage
  ) {
    this.dbRef = this.db.collection("reportes");
    const user$ = this.authService.getCurrentUserId().subscribe((data) => {
      this.currentUid = data.uid;
    });
  }
  public loadToStorage(file: string, fullname: string, type: Tipo) {
    this.timeStamp = new Date().getTime();
    this.fullName = fullname;
    this.newName = `${this.fullName + this.timeStamp}.jpeg`;
    let ubicacion = `images/${this.newName}`;
    let image = `data:image/jpeg;base64,${file}`;
    return this.fStorage
      .ref(ubicacion)
      .putString(image, "data_url")
      .then((res) => {
        return this.guardarLinda(file, ubicacion, type);
      })
      .catch((err) => {
        return err;
      });
  }

  public guardarLinda(file: string, ubicacion: string, type: number) {
    return storage()
      .ref(ubicacion)
      .getDownloadURL()
      .then((data) => {
        this.dbRef
          .add({
            uid: this.currentUid,
            fecha: Date.now(),
            name: this.fullName,
            likes: 0,
            dislikes: 0,
            url: data,
            type: type
          })
          .then((data) => {
            return true;
          })
          .catch((err) => {
            return err;
          });
      })
      .catch((err) => {
        return err;
      });
  }
}
