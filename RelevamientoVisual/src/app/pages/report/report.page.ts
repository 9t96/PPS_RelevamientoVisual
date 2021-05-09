import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CameraService } from 'src/app/services/camera/camera.service';
import { UploadService } from 'src/app/services/upload/upload.service';
import { User } from 'src/app/shared/clases/user';
import { eTipo } from 'src/app/shared/enum/eTipo';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  public currentUser: User
  public userName: string;
  public foto: string;
  constructor(public authSrv: AuthService, public cameraSrv: CameraService, public uploadSrv: UploadService) { }

  ngOnInit() {
    const user$ = this.authSrv.getCurrentUserId().subscribe( data =>{
      console.log(data)
      this.currentUser = data;
      this.authSrv.getCurrentName(this.currentUser.uid).subscribe( res =>{
        console.log(res)
        this.userName = res.nombre;
      })
    })
  }

  tomarImagen(tipo: eTipo){
    this.cameraSrv
    .OpenCamera()
    .then((data) => {
      console.log('Home - Camera service - return :' + data);
      this.foto = data;
      this.subirReporte(tipo);
      
    })
    .catch((err) => {
      console.log(err);
    });
  }



  subirReporte(type: eTipo){
    //subo img
    this.uploadSrv.loadToStorage(this.foto,this.userName,type);
    //guardo con referencia de img 
  }

  logout(){
    this.authSrv.SignOut();
  }

}
