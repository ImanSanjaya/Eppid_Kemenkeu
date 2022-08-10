import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { forkJoin } from 'rxjs';
import { PpidCmsService } from './ppid-cms.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public menus: []; 
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ppidService: PpidCmsService
  ) {
    this.initializeApp();
    this.decorateMenus();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  decorateMenus(){
    const reqMenus = this.ppidService.getMenus();
    forkJoin(reqMenus).subscribe( (res: any) => {
      const resMenus = res[0];
      this.menus = resMenus;

      for(let i=0; i < this.menus.length;i++){
        (<any>this.menus[i]).open = false;        
      }

      for(let i=0; i < this.menus.length;i++){
        if ( (<any>this.menus[i]).Name === 'Beranda')
          this.menus.splice(i,1);  
        if ( (<any>this.menus[i]).Name === 'Laporan')
          this.menus.splice(i,1);        
        if ( (<any>this.menus[i]).Name === 'Regulasi')
          this.menus.splice(i,1);  
        if ( (<any>this.menus[i]).Name === 'Login')
          this.menus.splice(i,1); 
      }

      // console.log(this.menus);
    });
  }

  dynamicLink(title:string, link:string){
    return "/page/"  + title + "/" + link.split("/")[1];
  }

  isLogin() {
    return this.ppidService.isLogin();
  }
}
