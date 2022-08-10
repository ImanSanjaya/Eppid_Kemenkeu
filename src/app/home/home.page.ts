import { Component, OnInit } from '@angular/core';
import { PpidCmsService } from '../ppid-cms.service';

import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  constructor(
    private ppidService: PpidCmsService,
    private router: Router,
    public alert: AlertController
  ) { }

  ngOnInit() {
    //localStorage.setItem('fisrtOpenApp', 'true');
    if(this.isLogin()){
      this.ppidService.CekSession();
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
    return this.ppidService.isLogin();
  }

}
