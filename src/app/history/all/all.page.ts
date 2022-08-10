import { Component, OnInit } from '@angular/core';
import { PpidCmsService } from '../../ppid-cms.service';

import { Router } from '@angular/router';

import * as _ from 'lodash';

@Component({
  selector: 'app-all',
  templateUrl: './all.page.html',
  styleUrls: ['./all.page.scss'],
})
export class AllPage implements OnInit {

  biodataPemohon;
  riwayatPermohonan;
  riwayatKeberatan;
  loadRiwayatPermohonan = false;
  loadRiwayatKeberatan = false;
  loadBiodataPemohon = false;
  statusPermohonanInformasi;
  statusPengajuanKeberatan;

  FileIdentitasData = 'File Identitas Data';
  BerkasPendukung = 'Berkas Pendukung';
  SuratKuasa = 'Surat Kuasa';

  riwayatsegment: string;
  constructor(
    private service: PpidCmsService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.isLogin()){
      this.loadData();
      this.service.CekSession();
    }
  }

  loadDataRiwayatPermohonan(){
    this.loadRiwayatPermohonan = false;
    this.service.getRiwayatPermohonan().subscribe( (data:any[]) =>{
      this.riwayatPermohonan = data['Data'];
      console.log('Data Permohonan ===>'+JSON.stringify(data['Data']));
      localStorage.setItem('permohonanSaya', JSON.stringify(data['Data']));
      this.loadRiwayatPermohonan = true;
    })
  }

  loadDataRiwayatKeberatan(){
    this.loadRiwayatKeberatan = false;
    this.service.getRiwayatKeberatan().subscribe( (data:any[]) =>{
      this.riwayatKeberatan = data['Data'];
      console.log('Data Keberatan ===>'+JSON.stringify(data['Data']));
      localStorage.setItem('keberatanSaya', JSON.stringify(data['Data']));
      this.loadRiwayatKeberatan = true;
    })
  }

  loadBiodata(){
    this.loadBiodataPemohon = false;
    this.biodataPemohon = this.service.getBiodata();
    this.loadBiodataPemohon = true;
  }

  loadData(){
    this.loadDataRiwayatPermohonan();
    this.loadDataRiwayatKeberatan();
    this.loadBiodata();
  }

  ionViewWillEnter(){
    this.riwayatsegment = "permohonanInformasiPublik";
  }

  isLogin() {
    return this.service.isLogin();
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

  statusKeberatan(status) {
    if(status == "" || status == null){
      this.statusPengajuanKeberatan = {status:"Verifikasi Identitas", color:"#fcb813"};
    }else if(status == "Diputihkan" ){
      this.statusPengajuanKeberatan = {status:"Diputihkan", color:"#ff5757"};
    }else if(status == "Verifikasi Identitas" ){
      this.statusPengajuanKeberatan = {status:"Verifikasi Identitas Gagal", color:"#ff5757"};
    }else if(status == "Proses" ){
      this.statusPengajuanKeberatan = {status:"Proses Pengumpulan Informasi", color:"#4f9oc5"};
    }else if(status == "Kirim Tanggapan" ){
      this.statusPengajuanKeberatan = {status:"Selesai", color:"#008037"};
    }else if(status == "Dibatalkan" ){
      this.statusPengajuanKeberatan = {status:"Dibatalkan", color:"#ff5757"};
    }else{
      this.statusPengajuanKeberatan = {status:"", color:"#fcb813"};
    }

    return this.statusPengajuanKeberatan;
  }

  pip(){
    this.router.navigateByUrl('/success-pip'); 
  }

  pk(){
    this.router.navigateByUrl('/success-pip'); 
  }

}
