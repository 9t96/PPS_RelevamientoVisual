import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  showAnimation: boolean;

  constructor(private router: Router) { 
    setTimeout(() => {
      this.router.navigateByUrl('login')
    }, 4000);
  }

  ngOnInit() {
    this.showAnimation = false;
  }

  ionViewWillEnter(){
    SplashScreen.hide();
  }

  ionViewWillLeave(){
    this.showAnimation = true;
  }

}
