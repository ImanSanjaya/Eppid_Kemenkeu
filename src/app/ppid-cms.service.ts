import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import * as _ from 'lodash';
import { catchError } from 'rxjs/operators';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';

import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';

@Injectable({
  providedIn: 'root'
})
export class PpidCmsService {

  constructor(
    private http: HttpClient,
    private router: Router,
    public alert: AlertController,
    private platform: Platform,
    private previewAnyFile: PreviewAnyFile
  ) { }

  public getSha1(str){
    //  discuss at: http://phpjs.org/functions/sha1/
     // original by: Webtoolkit.info (http://www.webtoolkit.info/)
     // improved by: Michael White (http://getsprink.com)
     // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
     //    input by: Brett Zamir (http://brett-zamir.me)
     //  depends on: utf8_encode
     //   example 1: sha1('Kevin van Zonneveld');
     //   returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'
   
     var rotate_left = function(n, s) {
       var t4 = (n << s) | (n >>> (32 - s));
       return t4;
     };
   
     /*var lsb_hex = function (val) { // Not in use; needed?
       var str="";
       var i;
       var vh;
       var vl;
   
       for ( i=0; i<=6; i+=2 ) {
         vh = (val>>>(i*4+4))&0x0f;
         vl = (val>>>(i*4))&0x0f;
         str += vh.toString(16) + vl.toString(16);
       }
       return str;
     };*/
   
     var cvt_hex = function(val) {
       var str = '';
       var i;
       var v;
   
       for (i = 7; i >= 0; i--) {
         v = (val >>> (i * 4)) & 0x0f;
         str += v.toString(16);
       }
       return str;
     };
   
     var blockstart;
     var i, j;
     var W = new Array(80);
     var H0 = 0x67452301;
     var H1 = 0xEFCDAB89;
     var H2 = 0x98BADCFE;
     var H3 = 0x10325476;
     var H4 = 0xC3D2E1F0;
     var A, B, C, D, E;
     var temp;
   
     //str = this.utf8_encode(str);
     var str_len = str.length;
   
     var word_array = [];
     for (i = 0; i < str_len - 3; i += 4) {
       j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 | str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
       word_array.push(j);
     }
   
     switch (str_len % 4) {
       case 0:
         i = 0x080000000;
         break;
       case 1:
         i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
         break;
       case 2:
         i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
         break;
       case 3:
         i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) <<
           8 | 0x80;
         break;
     }
   
     word_array.push(i);
   
     while ((word_array.length % 16) != 14) {
       word_array.push(0);
     }
   
     word_array.push(str_len >>> 29);
     word_array.push((str_len << 3) & 0x0ffffffff);
   
     for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
       for (i = 0; i < 16; i++) {
         W[i] = word_array[blockstart + i];
       }
       for (i = 16; i <= 79; i++) {
         W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
       }
   
       A = H0;
       B = H1;
       C = H2;
       D = H3;
       E = H4;
   
       for (i = 0; i <= 19; i++) {
         temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
         E = D;
         D = C;
         C = rotate_left(B, 30);
         B = A;
         A = temp;
       }
   
       for (i = 20; i <= 39; i++) {
         temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
         E = D;
         D = C;
         C = rotate_left(B, 30);
         B = A;
         A = temp;
       }
   
       for (i = 40; i <= 59; i++) {
         temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
         E = D;
         D = C;
         C = rotate_left(B, 30);
         B = A;
         A = temp;
       }
   
       for (i = 60; i <= 79; i++) {
         temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
         E = D;
         D = C;
         C = rotate_left(B, 30);
         B = A;
         A = temp;
       }
   
       H0 = (H0 + A) & 0x0ffffffff;
       H1 = (H1 + B) & 0x0ffffffff;
       H2 = (H2 + C) & 0x0ffffffff;
       H3 = (H3 + D) & 0x0ffffffff;
       H4 = (H4 + E) & 0x0ffffffff;
     }
   
     temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
     return temp.toUpperCase();
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

  public getMenus(){
    return this.http.get<any>(environment.apiCms  +'/PageMenus/', {});
  }

  public getContentPost(page:string){
    return this.http.get<any>(environment.apiCmsNew  +'/Posts/GetByUrl/' + page, {});
  }

  public getContentPage(page:string){
    console.log(page);
    return this.http.get<any>(environment.apiCmsNew  +'/Pages/ByUrl/' + page, {});
  }

  public getContentListPost(PageId:string){
    return this.http.get<any>(environment.apiCmsNew  +'/Posts?PageId='+ PageId +'&limit=10&offset=0', {});
  }

  public getMedia(mediaId: string){
    return this.http.get(environment.apiCms + '/Medias/' + mediaId, { responseType: 'blob' });
  }

  public doLogin(email, password){
    return this.http.post(environment.NewApiCms + '/Users/Login',
    {'username': email, 'password': password}, { responseType: 'json'});
  }

  public registrasiPemohon(form){
    return this.http.post(environment.NewApiCms + "/Users/Register", 
    {
      'Nama': form.Nama, 
      'JenisPemohon': form.JenisPemohon,
      'NPWP': form.NPWP, 
      'Pekerjaan': form.Pekerjaan,
      'Alamat': form.Alamat, 
      'Telp': form.Telp,
      'Fax': form.Fax, 
      'Keterangan': form.Keterangan,
      'Email': form.Email, 
      'PasswordPlain': form.PasswordPlain,
      'NIKPemohon': [
        {
            'NIK': form.NIKPemohon[0].NIK,
            'JenisNIK': form.NIKPemohon[0].JenisNIK
        }
      ]
    }, 
    { responseType: 'json'});
  }

  public UpdateUsers(form, id): Observable<any>{
    return this.http.put(environment.NewApiCms + "/Users/" + id, form, {
      headers: new HttpHeaders({
        'Content-Type' : 'json'
      })
    })
    .pipe(catchError(form));
  }

  public UpdateUser(id, data) {
    return this.http.put(`${environment.NewApiCms}/Users/${id}`, data);
  }

  public getPermohonanSaya(){
    return this.http.get<any>(environment.NewApiCms + '/Users/CurrentUser', {});
  }

  public getRiwayatPermohonan(){
    return this.http.get<any>(environment.NewApiCms + '/Permohonan?limit=10&offset=0', {});
  }

  public getRiwayatKeberatan(){
    return this.http.get<any>(environment.NewApiCms + '/Keberatan?limit=10&offset=0', {});
  }

  public getDataUser(){
    return this.http.get<any>(environment.NewApiCms + '/Users/CurrentUser', {});
  }

  public getCaraMendapatkan(){
    return this.http.get<any>(environment.apiCmsNew + '/Pemohon/CaraMendapatkan', {});
  }

  public getCaraMemperoleh(){
    return this.http.get<any>(environment.apiCmsNew + '/Pemohon/CaraMemperoleh', {});
  }

  public getPermohonanPadaKeberatan(){
    return this.http.get<any>(environment.NewApiCms + '/Permohonan/PermohonanDiajukanKeberatan', {});
  }

  public getJalurKomunikasi(){
    return this.http.get<any>(environment.oldCms + '/Pemohon/JalurPemohon', {});
  }

  public createKeberatan(data){
    return this.http.post<any>(environment.NewApiCms + "/Keberatan", data);
  }

  public createPermohonan(data){
    return this.http.post<any>(environment.NewApiCms + "/Permohonan", data);
  }

  public resetPassword(email){
    return this.http.post(environment.apiCmsNew + "/Users/RequestResetPasswordNew", 
    {
      'email': email
    }, 
    { responseType: 'json'});
  }

  publicGetUnitKerja(){
    return this.http.get<any>(environment.apiCms + '/Users/Unit', {});
  }

  public isLogin(): Boolean{
    const token = localStorage.getItem('token');
    return (token !== null) ? true : false; 
  }

  public getPermohonanKeberatan(permohonanId) {
    const permohonanKeberatanSaya = JSON.parse(localStorage.getItem('listPermohonanKeberatan') );
    return  _.find(permohonanKeberatanSaya, p => p.PermohonanId == permohonanId );
  }

  public getPermohonan(permohonanId) {
    const permohonanSaya = JSON.parse(localStorage.getItem('permohonanSaya') );
    return  _.find(permohonanSaya, p => p.PermohonanId == permohonanId );
  }

  public getKeberatan(keberatanId) {
    const keberatanSaya = JSON.parse(localStorage.getItem('keberatanSaya') );
    return  _.find(keberatanSaya, p => p.KeberatanId == keberatanId );
  }

  public getBiodata() {
    return JSON.parse(localStorage.getItem('biodataSaya') );
  }

  public getFileUploadPIP(idFileUpload, nameFileUpload){

    let path = null;
    if(this.platform.is("ios")){
      path = new File().documentsDirectory;
    }else{
      path = new File().externalDataDirectory;
    }

    return new FileTransfer().create().download(environment.NewApiCms + '/Files/Download/FilePermohonan/'+idFileUpload, path+nameFileUpload, true, 
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    ).then( entry => {
      this.presentAlert('File Download Tersimpan Di : ', entry.toURL().split("file:///storage/emulated/0/")[1]);
      this.PreviewAnyFiles(entry.toURL());
    }, (error) => {
      console.log('download error: ' + JSON.stringify(error));
      alert('download Gagal: ' + JSON.stringify(error));
    });
  }

  public getFileUploadPK(idFileUpload, nameFileUpload){

    let path = null;
    if(this.platform.is("ios")){
      path = new File().documentsDirectory;
    }else{
      path = new File().externalDataDirectory;
    }

    return new FileTransfer().create().download(environment.NewApiCms + '/Files/Download/FileKeberatan/'+idFileUpload, path+nameFileUpload, true, 
    {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    ).then( entry => {
      this.presentAlert('File Download Tersimpan Di : ', entry.nativeURL.split("file:///storage/emulated/0/")[1]);
      this.PreviewAnyFiles(entry.nativeURL);
    }, (error) => {
      console.log('download error: ' + JSON.stringify(error));
      alert('download Gagal: ' + JSON.stringify(error));
    });
  }

  public PreviewAnyFiles(url){
    this.previewAnyFile.preview(url).then((res: any) => 
    console.log(res)
    ).catch((error: any) => 
    this.presentAlert('Terjadi kesalahan saat membuka file : ', error)
    );
  }

  public CekSession(){
    this.getPermohonanSaya().subscribe( res => {
      // console.log('status '+ JSON.stringify(res));
      // if(res.status === 204){
      //   this.presentAlert('Maaf', 'Sesi akun anda telah berakhir, untuk melakukan pengajuan silahkan Login kembali.');
      //   this.router.navigateByUrl('/logout'); 
      // }
    },
    err => {
      console.error(err);
      if(err.status === 401){
        this.presentAlert('Maaf', 'Sesi akun anda telah berakhir, untuk melakukan pengajuan silahkan Login kembali.');
        this.router.navigateByUrl('/logout'); 
      }
    })
  } 

}
