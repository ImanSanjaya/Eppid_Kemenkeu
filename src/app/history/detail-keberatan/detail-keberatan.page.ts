import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PpidCmsService } from '../../ppid-cms.service';

import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-keberatan',
  templateUrl: './detail-keberatan.page.html',
  styleUrls: ['./detail-keberatan.page.scss'],
})
export class DetailKeberatanPage implements OnInit {

  id: string;
  keberatan: any;
  biodata: any;

  statusPengajuanKeberatan;

  FileIdentitasData = 'File Identitas Data';
  BerkasPendukung = 'Berkas Pendukung';
  SuratKuasa = 'Surat Kuasa';

  loadDetailRiwayatKeberatan = true;

  keys = [
    { key: 'KeberatanId', title: 'Keberatan No.' },
    { key: 'JenisPemohon', title: 'Jenis Pemohon' },
    { key: 'AlasanKeberatan', title: 'Isi Keberatan' },
    { key: 'AlasanKeberatanDetail', title: 'Detail Isi Keberatan' },
    { key: 'JalurKeberatan', title: 'Jalur' },
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

  // keysJawaban = [
  //   { key: 'NoRegistrasi', title: 'No. Registrasi' },
  //   { key: 'Status', title: 'Status' },
  //   { key: 'TglTindakLanjut', title: 'Tgl Tindak Lanjut' },
  //   { key: 'TglJatuhTempo', title: 'tgl Jatuh Tempo' },
  //   { key: 'PenjelasanInformasi', title: 'Penjelasan' },
  //   { key: 'PenguasaanInformasi', title: 'Penguasaan' },
  //   { key: 'AlasanDitolak', title: 'Alasan' },
  //   { key: 'BentukInformasi', title: 'Bentuk Informasi' },
  //   { key: 'NamaPejabat', title: 'Pejabat Berwenang' },
  //   { key: 'NamaJabatanPenandaTangan', title: 'Jabatan' },
  // ]

  constructor(
    private route: ActivatedRoute,
    private service: PpidCmsService,
    private location: Location
  ) { }

  ngOnInit() {
    if(this.isLogin()){
      this.route.params.subscribe(params => {
        this.id = params.id;
      });
      this.keberatan = this.service.getKeberatan(this.id);
      this.biodata = this.service.getBiodata();
      this.statusKeberatan(this.keberatan.Status);
      console.log('dataaaa=====>'+JSON.stringify(this.keberatan));
      this.service.CekSession();
    }
  }

  isLogin() {
    return this.service.isLogin();
  }

  goBack(){
    this.location.back();
  }

  downloadFileLampiran(idFileUpload, nameFileUpload){
    this.loadDetailRiwayatKeberatan = false;
    return this.service.getFileUploadPK(idFileUpload, nameFileUpload).then(entry =>{
      this.loadDetailRiwayatKeberatan = true;
    });
  }

  statusKeberatan(status) {
    if(status == "" || status == null ){
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
      this.statusPengajuanKeberatan = {status:"Status Belum Dikenal", color:"#ff5757"};
    }

    return this.statusPengajuanKeberatan;
  }

}
