import { Component, OnInit } from '@angular/core';
import { PpidCmsService } from '../../ppid-cms.service';

import * as _ from 'lodash';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  form = {
    email: ''
  }

  public async presentAlert(title, message) {
    const alert = await this.alert.create({
      header: 'PPID Kemenkeu',
      subHeader: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  constructor(
    private service: PpidCmsService, 
    public alert: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ResetPassword(){
    this.service.resetPassword(this.form.email).subscribe( res =>{
      this.presentAlert('Berhasil', 'Password Anda Telah Di Reset Kembali, Silahkan Cek Email Anda Untuk Mendapatkan Link Pengubahan Password.');
      this.router.navigateByUrl('/home'); 
    },
    err => {
      console.log("Error ==> "+ JSON.stringify(err));
    });
  }

}
