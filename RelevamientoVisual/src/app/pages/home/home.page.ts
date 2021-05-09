import { createViewChild } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ReaccionesService } from 'src/app/services/reacciones/reacciones.service';
import { ReportService } from 'src/app/services/report/report.service';
import { Reporte } from 'src/app/shared/clases/reporte';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public reports: Reporte[];
  public displayReports: Reporte[];
  public misReportes: Reporte[];
  public currentUid: string;
  public selected: string;
  public showSpinner: boolean = true;

  constructor(public reportSrv: ReportService, public reaccionesSrv: ReaccionesService, public authSrv: AuthService) { }

  ngOnInit() {
    this.selected = "todos"
    setTimeout(() => {
      this.showSpinner = false;
    }, 2500);
    const user$ = this.authSrv.getCurrentUserId().subscribe( data =>{
      this.currentUid = data.uid;
    })
    const reports$ = this.reportSrv.getReports().subscribe( reports =>{
      this.reports = reports;
      console.log( "Primer valor reportes --->", this.reports)
      this.reaccionesSrv.getReacciones().subscribe( reacciones =>{
        console.log( "Primer valor reacciones --->", reacciones)
        this.reports.map( rp =>{
          let found = reacciones.find( reac =>{ return (reac.reaction_id == rp.doc_id)})
          rp.reaccion = found;
          rp.hasVoted = rp.reaccion.votantes.some(x => x === this.currentUid);
          return rp;
        })
        this.displayReports = this.reports
        console.log( "Merged array --->", this.reports)
      })
      this.reports.sort( (x,y) =>{ return x.fecha + y.fecha});
      this.misReportes = this.reports.filter( x =>{
        return x.uid === this.currentUid;
      })
    })
  }

  saveLike(doc_id:string, likes: number){
    this.reaccionesSrv.updateReacciones(doc_id,likes+1, this.currentUid);
  }

  filtrarMisReportes(){

  }

  MostrarMisReportes(){
    //showSpinner
    this.displayReports = this.misReportes;
  }

  MostrarTodo(){
    //showSpinner
    this.displayReports = this.reports;
  }

  logout(){
    this.authSrv.SignOut();
  }


}
