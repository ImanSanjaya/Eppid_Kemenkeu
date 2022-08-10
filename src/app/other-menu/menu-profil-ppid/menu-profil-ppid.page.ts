import { Component, OnInit } from '@angular/core';
import { PpidCmsService } from '../../ppid-cms.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-menu-profil-ppid',
  templateUrl: './menu-profil-ppid.page.html',
  styleUrls: ['./menu-profil-ppid.page.scss'],
})
export class MenuProfilPpidPage implements OnInit {

  public menus: []; 

  constructor(
    private service: PpidCmsService
  ) { }

  ngOnInit() {
    this.listMenu();
    if(this.isLogin()){
      this.service.CekSession();
    }
  }

  isLogin() {
    return this.service.isLogin();
  }

  listMenu(){
    const reqMenus = this.service.getMenus();
    forkJoin(reqMenus).subscribe( (res: any) => {
      //console.log('DATAAAA = > '+JSON.stringify(res[0][1]['Items']));
      this.menus = res[0][1]['Items'];
    });
  }

  dynamicLink(title:string, link:string){
    return "/page/"  + title + "/" + link.split("/")[1];
  }

}
