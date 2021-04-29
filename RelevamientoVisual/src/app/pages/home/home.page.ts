import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report/report.service';
import { Reporte } from 'src/app/shared/reporte';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public reports: Reporte[];

  constructor(public reportSrv: ReportService) { }

  ngOnInit() {
    const reports$ = this.reportSrv.getReports().subscribe( reports =>{
      this.reports = reports;
    })
  }

}
