import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PpidCmsService } from '../../ppid-cms.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-registration',
  templateUrl: './form-registration.page.html',
  styleUrls: ['./form-registration.page.scss'],
})
export class FormRegistrationPage implements OnInit {

  registrasi = {
    Nama: '',
    JenisPemohon: 'Perorangan',
    NPWP: '',
    Pekerjaan: '',
    Alamat: '',
    Telp: '',
    Fax: '',
    Keterangan: '',
    Email: '',
    PasswordPlain: '',
    NIKPemohon: [
      {
          NIK: '',
          JenisNIK: 'KTP'
      }
    ]
  }
  passwordComfirmation: '';

  dataAll:any;

  constructor(
    private service: PpidCmsService,
    public alert: AlertController,
    private router: Router
  ) { }
  
  onLengthNIK(event:any){
    if(event.target.value.length >= 15){
      this.registrasi.NIKPemohon[0].NIK = event.target.value.substring(0, 16);
    }
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

  ngOnInit() {
    //untuk reset field semua input di dialam ion-input
    document.querySelectorAll('ion-input').forEach(input => input.value = '');
  }

  validasiInputRegistrasi(){
    if(this.registrasi.Nama == null || this.registrasi.Nama == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Nama Anda');
    }
    
    if(this.registrasi.NIKPemohon[0].NIK == null || this.registrasi.NIKPemohon[0].NIK == ''){
      this.presentAlert('Peringatan', 'Mohon Isi NIK Anda');
    }

    if(this.registrasi.NIKPemohon[0].NIK.toString().length < 16){
      this.presentAlert('Peringatan', 'Mohon Isi NIK Anda Dengan Benar');
    }

    if(this.registrasi.NIKPemohon[0].NIK.toString().length > 16){
      this.presentAlert('Peringatan', 'NIK anda melebihi 16 Digit');
    }

    if(this.registrasi.Pekerjaan == null || this.registrasi.Pekerjaan == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Pekerjaan Anda');
    }

    if(this.registrasi.Telp == null || this.registrasi.Telp == ''){
      this.presentAlert('Peringatan', 'Mohon Isi No Telepon Anda');
    }

    if(this.registrasi.Alamat == null || this.registrasi.Alamat == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Alamat Anda');
    }

    if(this.registrasi.Email == null || this.registrasi.Email == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Email Anda');
    }
    
    if(this.registrasi.PasswordPlain == null || this.registrasi.PasswordPlain == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Password Anda');
    }

    if(this.passwordComfirmation == null || this.passwordComfirmation == ''){
      this.presentAlert('Peringatan', 'Mohon Ketik Ulang Password Anda');
    }
  }

  submit(){
    if(this.passwordComfirmation == this.registrasi.PasswordPlain){
      if(this.registrasi.Email.includes('@')){
        var dumy_first = this.registrasi.Email;
        var res = dumy_first.split('@');
        if(res[1].includes('.')){
          this.validasiInputRegistrasi();
          if(this.registrasi.Nama != '' && this.registrasi.NIKPemohon[0].NIK != '' && this.registrasi.NIKPemohon[0].NIK.toString().length == 16 && this.registrasi.Pekerjaan != '' && this.registrasi.Telp != '' && this.registrasi.Email != '' && this.registrasi.PasswordPlain != '' && this.passwordComfirmation != '' && this.registrasi.Alamat != ''){
      
            this.service.registrasiPemohon(this.registrasi)
            .subscribe( (data:any[] ) => {
            if(data['Success'] == true){
              // berhasil login
              console.log("Success ==> "+ JSON.stringify(data));
              this.router.navigateByUrl('/success-registration');   
            } else{
              console.log("Fail ==> "+ JSON.stringify(data));
              this.presentAlert('Gagal Registrasi', data['Message']);
            }
            },
            err => {
              console.error('Gagal Registrasi ===> ', err.status);
              this.presentAlert('Gagal Registrasi', 'Login gagal. Silahkan cek kembali jaringan internet anda.');
            })
          }
        }else{
          this.presentAlert('Peringatan', 'Mohon, Isi Email Anda Dengan Benar.');
        }
      }else{
        this.presentAlert('Peringatan', 'Mohon, Isi Email Anda Dengan Benar.');
      }
    }else{
      this.presentAlert('Perhatian', 'Pastikan Ketik Ulang Password Anda Benar.');
    }
  }

}
