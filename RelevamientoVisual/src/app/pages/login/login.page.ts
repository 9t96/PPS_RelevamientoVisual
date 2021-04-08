import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

class User{
  email:string;
  password:string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User;
  public loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fromBuilder: FormBuilder, public toastController: ToastController) { 
    this.user = new User();
  }

  get name() { return this.loginForm.get('email'); }

  get power() { return this.loginForm.get('password'); }

  ngOnInit() {
      this.loginForm = this.fromBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(6)])]
  })
  }


  Login(){

    this.user.email = this.loginForm.get('email').value;
    this.user.password = this.loginForm.get('password').value;
    this.authService.SignIn(this.user.email, this.user.password).then( res =>{
      this.router.navigate(['home']);
    })
    .catch( err =>{ 
      err.code == "auth/wrong-password" ? this.presentToast("Uno o mas campos son invalidos...") : this.presentToast("Ha ocurrido un error vuelva a intentar.")
    })
  }

  testUser(accountNumber: number){
    switch (accountNumber) {
      case 1:
        this.loginForm.controls['email'].setValue('admin@admin.com') 
        this.loginForm.controls['password'].setValue('111111')
        break;
      case 2:
        this.loginForm.controls['email'].setValue('invitado@invitado.com') 
        this.loginForm.controls['password'].setValue('222222')
        break;
    }
    
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      cssClass: 'toast-danger'
    });
    toast.present();
  }
}
