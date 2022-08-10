import { Component, OnInit } from '@angular/core';
import { PpidCmsService } from '../../ppid-cms.service';

import * as _ from 'lodash';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.page.html',
  styleUrls: ['./view-account.page.scss'],
})
export class ViewAccountPage implements OnInit {

  biodata: any;
  
  keysBiodata = [
    { key: 'Nama', title: 'Nama Lengkap' },
    { key: 'JenisNIK', title: 'Jenis Identitas' },
    { key: 'NIK', title: 'No. Identitas' },
    { key: 'Pekerjaan', title: 'Pekerjaan' },
    { key: 'NPWP', title: 'NPWP' },
    { key: 'Alamat', title: 'Alamat' },
    { key: 'Telp', title: 'Telepon' },
    { key: 'Email', title: 'Email' }
  ]
  
  loading = false;

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
  	if(this.isLogin()){
      this.loadData();
      this.service.CekSession();
    }
  }

  isLogin() {
    return this.service.isLogin();
  }

  loadData(){
    this.loading = false;
    this.biodata = this.service.getBiodata();
    this.loading = true;
  } 

  ResetPassword(){
    this.service.resetPassword(this.biodata.Email).subscribe( res =>{
      this.presentAlert('Berhasil', 'Password Anda Telah Di Reset Kembali, Silahkan Cek Email Anda Untuk Mendapatkan Link Pengubahan Password.');
      this.router.navigateByUrl('/logout'); 
    },
    err => {
      console.log("Error ==> "+ JSON.stringify(err));
    });
  }

}
