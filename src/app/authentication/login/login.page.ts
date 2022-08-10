import { Component, OnInit } from '@angular/core';
import { PpidCmsService } from '../../ppid-cms.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = {
    email: '',
    password: ''
  }

  constructor(
    private router: Router, 
    private service: PpidCmsService, 
    public alert: AlertController
    ) { }

  public async presentAlert(title, message) {
    const alert = await this.alert.create({
      header: 'PPID',
      subHeader: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }

  setBiodata(){
    this.service.getPermohonanSaya().subscribe( (data:any[]) => {
      localStorage.setItem('biodataSaya', JSON.stringify(data));
    })
  } 

  validasiInputLogin(){
    if(this.form.email == null || this.form.email == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Email Anda');
    }

    if(this.form.password == null || this.form.password == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Password Anda');
    }
  }

  doLogin() {
    this.validasiInputLogin();

    if(this.form.email != '' &&  this.form.password != ''){
      this.service.doLogin(this.form.email, this.form.password)
      .subscribe( (data:any[] ) => {
        if(data['Success'] == true){
          // berhasil login
          console.log("Success ==> "+ JSON.stringify(data));
          localStorage.setItem('token', data['Data'].Token);
          this.setBiodata();
          this.router.navigateByUrl('home');  
        } else{
          console.log("Fail ==> "+ JSON.stringify(data));
          this.presentAlert('Gagal Login', data['Message']);
        }
      },
      err => {
        console.error('Gagal login: ', err);
        this.presentAlert('Gagal Login', 'Login gagal. Silahkan cek kembali jaringan internet anda.');
      })
    }
  }
  
}
