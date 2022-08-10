import { Component, OnInit } from '@angular/core';
import { PpidCmsService } from '../../ppid-cms.service';
import { forkJoin, from } from 'rxjs';
import { Location } from '@angular/common';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-form-pip',
  templateUrl: './form-pip.page.html',
  styleUrls: ['./form-pip.page.scss'],
})
export class FormPipPage implements OnInit {

  permohonan = {
    IsActive: '',
    IsApproved: '',
    Keberatan: '',
    Permohonan: '',
    Nama: '',
    PemohonId: '',
    NIK: '',
    JalurPemohon: '',
    JenisPemohon: '',
    JenisNIK: '',
    NPWP: '',
    Pekerjaan: '',
    Alamat: '',
    Telp: '',
    Fax: '',
    Keterangan: '',
    Email: '',
    Password: '',
    AdminBy: '',
    CreatedDate :'',

    KodeUnit: '',
    IsiPermohonan: '',
    Tujuan: '',
    CaraPerolehInfo: '',
    CaraDapatkanInfo: ''
  }

  loading = false;
  caraMemperoleh;
  caraMendapatkan;
  unitKerja;

  fileIdentitas;
  filePendukung;

  validasiFileIdentitas = false;
  validasiFilePendukung = false;

  constructor(
    private service: PpidCmsService, 
    public alert: AlertController,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.isLogin()){
      this.loadData();
      this.service.CekSession();
    }
    this.fileIdentitas = null;
    this.filePendukung = null;
  }

  isLogin() {
    return this.service.isLogin();
  }

  goBack(){
    this.location.back();
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

  loadData(){
    this.loading = false;

    // Load from localStorage
    let biodata = this.service.getBiodata();

    this.permohonan.IsActive = biodata.IsActive,
    this.permohonan.IsApproved = biodata.IsApproved,
    this.permohonan.Keberatan = biodata.Keberatan,
    this.permohonan.Permohonan = biodata.Permohonan,
    this.permohonan.Nama = biodata.Nama,
    this.permohonan.PemohonId = biodata.PemohonId,
    this.permohonan.NIK = biodata.NIK,
    this.permohonan.JalurPemohon = biodata.JalurPemohon,
    this.permohonan.JenisPemohon = biodata.JenisPemohon,
    this.permohonan.JenisNIK = biodata.JenisNIK,
    this.permohonan.NPWP = biodata.NPWP,
    this.permohonan.Pekerjaan = biodata.Pekerjaan,
    this.permohonan.Alamat = biodata.Alamat,
    this.permohonan.Telp = biodata.Telp,
    this.permohonan.Fax = biodata.Fax,
    this.permohonan.Keterangan = biodata.Keterangan,
    this.permohonan.Email = biodata.Email,
    this.permohonan.Password = biodata.Password,
    this.permohonan.AdminBy = biodata.AdminBy

    let date = new Date();
    this.permohonan.CreatedDate = date.toLocaleString();

    const getCaraMemperoleh = this.service.getCaraMemperoleh();
    const getCaraMendapatkan = this.service.getCaraMendapatkan();
    const getUnitKerja = this.service.publicGetUnitKerja();

    forkJoin(getCaraMemperoleh, getCaraMendapatkan, getUnitKerja).subscribe( res => {
      const resCaraMemperoleh = res[0]['Data'];
      const resCaraMendapatkan = res[1]['Data'];
      const resUnitKerja = res[2];

      //console.log('Datanya Nih====>>'+JSON.stringify(res[1]['Data']));
      this.caraMemperoleh = resCaraMemperoleh;
      this.caraMendapatkan = resCaraMendapatkan;
      this.unitKerja = resUnitKerja;

      //Menghilangkan menu faksimili
      for(let i=0; i < this.caraMendapatkan.length;i++){
        if ( <any>this.caraMendapatkan[i] === 'faksimili')
          this.caraMendapatkan.splice(i,1);        
      }


      this.loading = true;
    });
  }
  
  validasiInputPIP(){

    this.validasiFileIdentitas = false;
    this.validasiFilePendukung = false;

    if(this.permohonan.KodeUnit == null || this.permohonan.KodeUnit == ''){
      this.presentAlert('Peringatan', 'Mohon Pilih Tujuan PPID');
    }

    if(this.permohonan.IsiPermohonan == null || this.permohonan.IsiPermohonan == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Rincian Informasi Yang Dibutuhkan');
    }

    if(this.permohonan.Tujuan == null || this.permohonan.Tujuan == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Tujuan Penggunaan Informasi');
    }

    if(this.permohonan.CaraPerolehInfo == null || this.permohonan.CaraPerolehInfo == ''){
      this.presentAlert('Peringatan', 'Mohon Pilih Cara Anda Memperoleh Data');
    }

    if(this.permohonan.CaraDapatkanInfo == null || this.permohonan.CaraDapatkanInfo == ''){
      this.presentAlert('Peringatan', 'Mohon Pilih Cara Anda Mendapatkan Data');
    }

    if(this.fileIdentitas == null || this.fileIdentitas == ''){
      this.presentAlert('Peringatan', 'Mohon File Identitas Agar Dilengkapi');
    }

    if(this.fileIdentitas.name.split(".")[1] == 'jpeg' || this.fileIdentitas.name.split(".")[1] == 'jpg' || this.fileIdentitas.name.split(".")[1] == 'png' || this.fileIdentitas.name.split(".")[1] == 'pdf'){
      this.validasiFileIdentitas = true;
      if(this.fileIdentitas.size > 10000000){
        this.presentAlert('Peringatan', 'Ukuran File Identitas Anda Melebihi batas maksimal');
      }
    }else{
      this.presentAlert('Peringatan', 'File Identitas yang anda upload tidak sesuai dengan validasi file kami');
    }

    if(this.filePendukung != null){
      if(this.filePendukung.name.split(".")[1] == 'jpeg' || this.filePendukung.name.split(".")[1] == 'jpg' || this.filePendukung.name.split(".")[1] == 'png' || this.filePendukung.name.split(".")[1] == 'pdf' || this.filePendukung.name.split(".")[1] == 'docx' || this.filePendukung.name.split(".")[1] == 'doc'){
        this.validasiFilePendukung = true;
        if(this.filePendukung.size > 10000000){
          this.presentAlert('Peringatan', 'Ukuran File Pendukung Anda Melebihi batas maksimal');
        }
      }else{
        this.presentAlert('Peringatan', 'File Pendukung yang anda upload tidak sesuai dengan validasi file kami');
      }
    }

  }

  setFileIdentitas(event:any){
    this.fileIdentitas = event.target.files[0];
    //console.log(event.target.files[0].name.split(".")[1]);
  }

  setFilePendukung(event:any){
    this.filePendukung = event.target.files[0];
  }

  submit(){
    this.validasiInputPIP();

    if(this.filePendukung != null){
      if(this.permohonan.IsiPermohonan != '' && this.permohonan.Tujuan != '' && this.permohonan.CaraPerolehInfo != '' && this.permohonan.CaraDapatkanInfo != '' && this.permohonan.KodeUnit != '' && this.fileIdentitas != null && this.validasiFileIdentitas && this.fileIdentitas.size <= 10000000 && this.validasiFilePendukung && this.filePendukung.size <= 10000000){
        this.prosesSaveData();
      }
    }else{
      if(this.permohonan.IsiPermohonan != '' && this.permohonan.Tujuan != '' && this.permohonan.CaraPerolehInfo != '' && this.permohonan.CaraDapatkanInfo != '' && this.permohonan.KodeUnit != '' && this.fileIdentitas != null && this.validasiFileIdentitas && this.fileIdentitas.size <= 10000000){
        this.prosesSaveData();
      }
    }

  }

  prosesSaveData(){
    this.loading = false;

    const formData = new FormData();
    formData.append("IsiPermohonan", this.permohonan.IsiPermohonan);
    formData.append("Tujuan", this.permohonan.Tujuan);
    formData.append("CaraPerolehInfo", this.permohonan.CaraPerolehInfo);
    formData.append("CaraDapatkanInfo", this.permohonan.CaraDapatkanInfo);
    formData.append("FileIdentitasData", this.fileIdentitas);
    formData.append("DokumenPendukungData", this.filePendukung);
    formData.append("KodeUnit", this.permohonan.KodeUnit);

    this.service.createPermohonan(formData)
    .subscribe( (data:any[]) =>{
      if(data['Success'] == true){
        this.loading = true;
        this.router.navigateByUrl('/success-pip'); 
      } else{
        console.log("Fail ==> "+ JSON.stringify(data));
        this.loading = true;
        this.presentAlert('Untuk perhatian Anda. Fail', 'Akun Anda belum terverifikasi oleh pengelola PPID Kemenkeu. Silahkan menunggu atau gunakan jalur lain untuk berkomunikasi.');
      }
    },
    err => {
      console.log("Error ==> "+ JSON.stringify(err));
      this.presentAlert('Untuk perhatian Anda. Error', 'akun Anda belum terverifikasi oleh pengelola PPID Kemenkeu. Silahkan menunggu atau gunakan jalur lain untuk berkomunikasi.');
    });
  }

}
