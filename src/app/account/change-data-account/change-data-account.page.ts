import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PpidCmsService } from '../../ppid-cms.service';

import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-data-account',
  templateUrl: './change-data-account.page.html',
  styleUrls: ['./change-data-account.page.scss'],
})
export class ChangeDataAccountPage implements OnInit {

  biodata:any;

  constructor(
    private route: ActivatedRoute,
    private service: PpidCmsService,
    public alert: AlertController,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.biodata = this.service.getBiodata();
    console.log(JSON.stringify(this.biodata));
    if(this.isLogin()){
      this.service.CekSession();
    }
  }

  isLogin() {
    return this.service.isLogin();
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

  goBack(){
    this.location.back();
  }

  setBiodata(){
    this.service.getPermohonanSaya().subscribe( (data:any[]) => {
      localStorage.setItem('biodataSaya', JSON.stringify(data));
    })
  } 

  validasiInputUbahDataAkun(){
    if(this.biodata.Nama == null || this.biodata.Nama == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Nama Anda');
    }

    if(this.biodata.Pekerjaan == null || this.biodata.Pekerjaan == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Pekerjaan Anda');
    }
    
    if(this.biodata.Alamat == null || this.biodata.Alamat == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Alamat Anda');
    }

    if(this.biodata.Telp == null || this.biodata.Telp == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Nomor Telepon Anda');
    }
  }

  submit(){

    this.validasiInputUbahDataAkun();

    if(this.biodata.Nama != '' && this.biodata.Pekerjaan != '' && this.biodata.Alamat != '' && this.biodata.Telp != ''){

      const data = {
        Nama: this.biodata.Nama,
        NPWP: this.biodata.NPWP,
        Pekerjaan: this.biodata.Pekerjaan,
        Alamat: this.biodata.Alamat,
        Telp: this.biodata.Telp,
        Fax: this.biodata.Fax,
        Keterangan: this.biodata.Keterangan
      };

      this.service.UpdateUser(this.biodata.PemohonId, data)
      .subscribe( res => {
        if(res['Success'] == true){
          // berhasil login
          console.log("Success ==> "+ JSON.stringify(res));
          this.setBiodata();
          this.router.navigateByUrl('/success-account');  
        } else{
          console.log("Fail ==> "+ JSON.stringify(res));
          this.presentAlert('Ubah Data Gagal', 'Mohon cek kembali data Registrasi anda.');
        }
      },
      err => {
        console.error('Ubah Data Gagal ==> ', err.status);
        this.presentAlert('Ubah Data', 'Silahkan cek kembali jaringan internet anda.');
      })
    }
  }

}
