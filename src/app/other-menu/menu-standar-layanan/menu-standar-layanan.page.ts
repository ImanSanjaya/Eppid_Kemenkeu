import { Component, OnInit } from '@angular/core';
import { PpidCmsService } from '../../ppid-cms.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-menu-standar-layanan',
  templateUrl: './menu-standar-layanan.page.html',
  styleUrls: ['./menu-standar-layanan.page.scss'],
})
export class MenuStandarLayananPage implements OnInit {

  public menus: []; 

  constructor(
    private ppidService: PpidCmsService
  ) { }

  ngOnInit() {
    this.listMenu();
    if(this.isLogin()){
      this.ppidService.CekSession();
    }
  }

  isLogin() {
    return this.ppidService.isLogin();
  }

  listMenu(){
    const reqMenus = this.ppidService.getMenus();
    forkJoin(reqMenus).subscribe( (res: any) => {
      //console.log('DATAAAA = > '+JSON.stringify(res[0][1]['Items']));
      this.menus = res[0][5]['Items'];
    });
  }

  dynamicLink(title:string, link:string){
    return "/page/"  + title + "/" + link.split("/")[1];
  }

}
