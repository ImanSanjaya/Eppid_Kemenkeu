import { Component, OnInit } from '@angular/core';
import { forkJoin, from } from 'rxjs';
import { PpidCmsService } from '../../ppid-cms.service'
import { Location } from '@angular/common';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-form-pk',
  templateUrl: './form-pk.page.html',
  styleUrls: ['./form-pk.page.scss'],
})
export class FormPkPage implements OnInit {

  keberatan = {
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

    PermohonanId :'',
    KeberatanAtas: '',
    KodeUnit: '',
    NamaKuasa : '',
    NIKKuasa : '',
    TeleponFaxEmailKuasa : '',
    AlamatKuasa : '',
    AlasanPengajuanKeberatan: '', //tidak wajib di isi
    KasusPosisi: '' //tidak wajib di isi
    
    //JalurKomunikasi: ''
  }

  selectPermohonanKeberatan: any;

  loading = false;
  permohonanPadaKeberatan;
  caraMendapatkan;
  unitKerja;

  fileSuratKuasa;

  validasiFileSuratKuasa = false;

  fileIdentitas;
  filePendukung;

  validasiFileIdentitas = false;
  validasiFilePendukung = false;

  loadOptionKeberatanAtas = false;
  loadKuasaData = false;

  cekValidasiSelectKeberatanAtas = false;

  constructor(
    private service: PpidCmsService, 
    private location: Location,
    public alert: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.isLogin()){
      this.loadData();
      this.service.CekSession();
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

  isLogin() {
    return this.service.isLogin();
  }

  loadData(){
    this.loading = false;

    // Load from localStorage
    let biodata = this.service.getBiodata();

    this.keberatan.IsActive = biodata.IsActive,
    this.keberatan.IsApproved = biodata.IsApproved,
    this.keberatan.Keberatan = biodata.Keberatan,
    this.keberatan.Permohonan = biodata.Permohonan,
    this.keberatan.Nama = biodata.Nama,
    this.keberatan.PemohonId = biodata.PemohonId,
    this.keberatan.NIK = biodata.NIK,
    this.keberatan.JalurPemohon = biodata.JalurPemohon,
    this.keberatan.JenisPemohon = biodata.JenisPemohon,
    this.keberatan.JenisNIK = biodata.JenisNIK,
    this.keberatan.NPWP = biodata.NPWP,
    this.keberatan.Pekerjaan = biodata.Pekerjaan,
    this.keberatan.Alamat = biodata.Alamat,
    this.keberatan.Telp = biodata.Telp,
    this.keberatan.Fax = biodata.Fax,
    this.keberatan.Keterangan = biodata.Keterangan,
    this.keberatan.Email = biodata.Email,
    this.keberatan.Password = biodata.Password,
    this.keberatan.AdminBy = biodata.AdminBy

    let date = new Date();
    this.keberatan.CreatedDate = date.toLocaleString();

    const getPermohonanPadaKeberatan = this.service.getPermohonanPadaKeberatan();
    const getCaraMendapatkan = this.service.getCaraMendapatkan();
    const getUnitKerja = this.service.publicGetUnitKerja();

    forkJoin(getPermohonanPadaKeberatan, getCaraMendapatkan, getUnitKerja).subscribe( res => {
      
      localStorage.setItem('listPermohonanKeberatan', JSON.stringify(res[0]['Data']));
      
      const resPermohonanPadaKeberatan = res[0]['Data'];
      const resCaraMendapatkan = res[1]['Data'];
      const resUnitKerja = res[2];

      //console.log(resPermohonanPadaKeberatan,resCaraMendapatkan,resUnitKerja);
      this.permohonanPadaKeberatan = resPermohonanPadaKeberatan;
      this.caraMendapatkan = resCaraMendapatkan;
      this.unitKerja = resUnitKerja;


      this.loading = true;
    });
  }

  goBack(){
    this.location.back();
  }

  selectKeberatanAtas(idPermohonan){
    if(idPermohonan != 0){
      console.log('--Pilih Keberatan Permohonan--');
      this.keberatan.PermohonanId = idPermohonan;
      this.selectPermohonanKeberatan = this.service.getPermohonanKeberatan(idPermohonan);
      this.keberatan.KodeUnit = this.selectPermohonanKeberatan.KodeUnit;
      this.loadOptionKeberatanAtas = true;
      this.cekValidasiSelectKeberatanAtas = true;
    }else{
      console.log('--Pilih Permohonan--');
      this.loadOptionKeberatanAtas = false;
      this.cekValidasiSelectKeberatanAtas = true;
    }
  }

  setLoadKuasaData(){
    if(this.loadKuasaData == true){
      this.loadKuasaData = false;
      this.keberatan.NamaKuasa = '';
      this.keberatan.NIKKuasa = '';
      this.keberatan.TeleponFaxEmailKuasa = '';
      this.keberatan.AlamatKuasa = '';
      this.fileSuratKuasa = null;
    }else{
      this.loadKuasaData = true;
    }
  }

  onLengthNIK(event:any){
    if(event.target.value.length >= 15){
      this.keberatan.NIKKuasa = event.target.value.substring(0, 16);
    }
  }

  validasiInputPK(){

    this.validasiFileSuratKuasa = false;
    this.validasiFileIdentitas = false;
    this.validasiFilePendukung = false;

    if(this.loadKuasaData == true){

      if(this.keberatan.NamaKuasa == null || this.keberatan.NamaKuasa == ''){
        this.presentAlert('Peringatan', 'Mohon Isi Nama Kuasa');
      }

      if(this.keberatan.NIKKuasa == null || this.keberatan.NIKKuasa == ''){
        this.presentAlert('Peringatan', 'Mohon Isi NIK Kuasa');
      }

      if(this.keberatan.NIKKuasa.toString().length < 16){
        this.presentAlert('Peringatan', 'Mohon Isi NIK Anda Dengan Benar');
      }

      if(this.keberatan.NIKKuasa.toString().length > 16){
        this.presentAlert('Peringatan', 'NIK anda melebihi 16 Digit');
      }

      if(this.keberatan.TeleponFaxEmailKuasa == null || this.keberatan.TeleponFaxEmailKuasa == ''){
        this.presentAlert('Peringatan', 'Mohon Isi Nomor Telepon / Fax / Email');
      }

      if(this.keberatan.AlamatKuasa == null || this.keberatan.AlamatKuasa == ''){
        this.presentAlert('Peringatan', 'Mohon Isi Alamat Kuasa');
      }

      if(this.fileSuratKuasa == null || this.fileSuratKuasa == ''){
        this.presentAlert('Peringatan', 'Mohon Lampirkan Surat Kuasa');
      }

      if(this.fileSuratKuasa.name.split(".")[1] == 'jpeg' || this.fileSuratKuasa.name.split(".")[1] == 'jpg' || this.fileSuratKuasa.name.split(".")[1] == 'png' || this.fileSuratKuasa.name.split(".")[1] == 'pdf' || this.fileSuratKuasa.name.split(".")[1] == 'docx' || this.fileSuratKuasa.name.split(".")[1] == 'doc'){
        this.validasiFileSuratKuasa = true;
        if(this.fileSuratKuasa.size > 10000000){
          this.presentAlert('Peringatan', 'Ukuran File Surat Kuasa Anda Melebihi batas maksimal');
        }
      }else{
        this.presentAlert('Peringatan', 'File Surat Kuasa yang anda upload tidak sesuai dengan validasi file kami');
      }
    
    }

    if(!this.cekValidasiSelectKeberatanAtas){
      this.presentAlert('Peringatan', 'Mohon Pilih Keberatan Atas');
    }

    if(this.keberatan.KodeUnit == null || this.keberatan.KodeUnit == ''){
      this.presentAlert('Peringatan', 'Mohon Pilih Tujuan PPID');
    }

    if(this.keberatan.AlasanPengajuanKeberatan == null || this.keberatan.AlasanPengajuanKeberatan == ''){
      this.presentAlert('Peringatan', 'Mohon Isi Alasan Pengajuan Keberatan');
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
  }

  setFilePendukung(event:any){
    this.filePendukung = event.target.files[0];
  }

  setFileSuratKuasa(event:any){
    this.fileSuratKuasa = event.target.files[0];
  }

  submit(){
    this.validasiInputPK();

    if(this.loadKuasaData == true){
      if(this.filePendukung != null){
        if(this.cekValidasiSelectKeberatanAtas && this.keberatan.KodeUnit != '' && this.keberatan.AlasanPengajuanKeberatan != '' && this.fileIdentitas != null && this.validasiFileIdentitas && this.fileIdentitas.size <= 10000000 && this.validasiFilePendukung && this.filePendukung.size <= 10000000 && this.keberatan.NamaKuasa != '' && this.keberatan.NIKKuasa != '' && this.keberatan.NIKKuasa.toString().length == 16 && this.keberatan.TeleponFaxEmailKuasa != ''  && this.keberatan.AlamatKuasa != ''  && this.fileSuratKuasa != null && this.validasiFileSuratKuasa && this.fileSuratKuasa.size <= 10000000){
          this.prosesSaveData();
        }
      }else{
        if(this.cekValidasiSelectKeberatanAtas && this.keberatan.KodeUnit != '' && this.keberatan.AlasanPengajuanKeberatan != '' && this.fileIdentitas != null && this.validasiFileIdentitas && this.fileIdentitas.size <= 10000000 && this.keberatan.NamaKuasa != '' && this.keberatan.NIKKuasa != '' && this.keberatan.NIKKuasa.toString().length == 16 && this.keberatan.TeleponFaxEmailKuasa != ''  && this.keberatan.AlamatKuasa != ''  && this.fileSuratKuasa != null && this.validasiFileSuratKuasa && this.fileSuratKuasa.size <= 10000000){
          this.prosesSaveData();
        }
      }
    }else{
      if(this.filePendukung != null){
        if(this.cekValidasiSelectKeberatanAtas && this.keberatan.KodeUnit != '' && this.keberatan.AlasanPengajuanKeberatan != '' && this.fileIdentitas != null && this.validasiFileIdentitas && this.fileIdentitas.size <= 10000000 && this.validasiFilePendukung && this.filePendukung.size <= 10000000){
          this.prosesSaveData();
        }
      }else{
        if(this.cekValidasiSelectKeberatanAtas && this.keberatan.KodeUnit != '' && this.keberatan.AlasanPengajuanKeberatan != '' && this.fileIdentitas != null && this.validasiFileIdentitas && this.fileIdentitas.size <= 10000000){
          this.prosesSaveData();
        }
      }
    }
  }

  prosesSaveData(){
    this.loading = false;

    const formData = new FormData();
    formData.append("PermohonanId", this.keberatan.PermohonanId);
    formData.append("AlasanKeberatan", this.keberatan.AlasanPengajuanKeberatan);
    formData.append("FileIdentitasPemohonData", this.fileIdentitas);
    formData.append("BerkasPendukungData", this.filePendukung);
    formData.append("KodeUnit", this.keberatan.KodeUnit);
    formData.append("NamaKuasa", this.keberatan.NamaKuasa);
    formData.append("NIKKuasa", this.keberatan.NIKKuasa);
    formData.append("TelpFaxEmailKuasa", this.keberatan.TeleponFaxEmailKuasa);
    formData.append("AlamatKuasa", this.keberatan.AlamatKuasa);
    formData.append("SuratKuasaData", this.fileSuratKuasa);
    formData.append("AlasanKeberatanDetail", this.keberatan.KasusPosisi);

    this.service.createKeberatan(formData)
    .subscribe( (data:any[]) =>{
      if(data['Success'] == true){
        this.loading = true;
        this.router.navigateByUrl('/success-pk'); 
      } else{
        console.log("Fail ==> "+ JSON.stringify(data));
        this.presentAlert('Untuk perhatian Anda. Fail', 'Akun Anda belum terverifikasi oleh pengelola PPID Kemenkeu. Silahkan menunggu atau gunakan jalur lain untuk berkomunikasi.');
      }
    },
    err => {
      console.log("Error ==> "+ JSON.stringify(err));
      this.presentAlert('Untuk perhatian Anda. Error', 'Akun Anda belum terverifikasi oleh pengelola PPID Kemenkeu. Silahkan menunggu atau gunakan jalur lain untuk berkomunikasi.');
    });
  }

}
