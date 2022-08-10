import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PpidCmsService } from '../../ppid-cms.service';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-permohonan',
  templateUrl: './detail-permohonan.page.html',
  styleUrls: ['./detail-permohonan.page.scss'],
})
export class DetailPermohonanPage implements OnInit {

  id: string;
  permohonan: any;
  biodata: any;

  statusPermohonanInformasi;
  statusPengajuanKeberatan;

  loadDetailRiwayatPermohonan = true;

  keys = [
    { key: 'PermohonanId', title: 'Permohonan No.' },
    { key: 'JenisPemohon', title: 'Jenis Pemohon' },
    { key: 'IsiPermohonan', title: 'Isi Permohonan' },
    { key: 'Tujuan', title: 'Tujuan' },
    { key: 'CaraDapatkanInfo', title: 'Cara Mendapatkan Info' },
    { key: 'CaraPerolehInfo', title: 'Cara Memperoleh Info' },
    { key: 'JalurPermohonan', title: 'Jalur' },
  ]

  keysBiodata = [
    { key: 'Nama', title: 'Nama' },
    { key: 'JenisNIK', title: 'Jenis Identitas' },
    { key: 'NIK', title: 'No. Identitas' },
    { key: 'NPWP', title: 'NPWP' },
    { key: 'Alamat', title: 'Alamat' },
    { key: 'Telp', title: 'Telepon' },
    { key: 'Email', title: 'Email' },
    { key: 'JalurPemohon', title: 'Jalur' },
  ]

  keysJawaban = [
    { key: 'NoRegistrasi', title: 'No. Registrasi' },
    { key: 'Status', title: 'Status' },
    { key: 'TglTindakLanjut', title: 'Tgl Tindak Lanjut' },
    { key: 'TglJatuhTempo', title: 'tgl Jatuh Tempo' },
    { key: 'PenjelasanInformasi', title: 'Penjelasan' },
    { key: 'PenguasaanInformasi', title: 'Penguasaan' },
    { key: 'AlasanDitolak', title: 'Alasan' },
    { key: 'BentukInformasi', title: 'Bentuk Informasi' },
    { key: 'NamaPejabat', title: 'Pejabat Berwenang' },
    { key: 'NamaJabatanPenandaTangan', title: 'Jabatan' },
  ]

  constructor(
    private route: ActivatedRoute,
    private service: PpidCmsService,
    private location: Location,
    private platform: Platform,
    public alert: AlertController
  ) {}

  

  ngOnInit() {
    if(this.isLogin()){
      this.route.params.subscribe(params => {
        this.id = params.id;
      });
      this.permohonan = this.service.getPermohonan(this.id);
      this.biodata = this.service.getBiodata();
      this.statusPermohonan(this.permohonan.Status);
      console.log('dataaaa=====>'+JSON.stringify(this.permohonan));
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

  goBack(){
    this.location.back();
  }

  downloadFileLampiran(idFileUpload, nameFileUpload){
    this.loadDetailRiwayatPermohonan = false;
    return this.service.getFileUploadPIP(idFileUpload, nameFileUpload).then( entry => {
      this.loadDetailRiwayatPermohonan = true;
    });
  }

  statusPermohonan(status) {
    if(status == 1 ){
      this.statusPermohonanInformasi = {status:"Verifikasi Identitas", color:"#fcb813"};
    }else if(status == 2 || status == 3 ){
      this.statusPermohonanInformasi = {status:"Proses Pengumpulan Informasi", color:"#4f9oc5"};
    }else if(status == 5 ){
      this.statusPermohonanInformasi = {status:"Selesai", color:"#008037"};
    }else if(status == 6 || status == 10 ){ //6 = identitas tidak sesuai. 10 = spam
      this.statusPermohonanInformasi = {status:"Verifikasi Identitas Gagal", color:"#ff5757"};
    }
    return this.statusPermohonanInformasi;
  }

}
