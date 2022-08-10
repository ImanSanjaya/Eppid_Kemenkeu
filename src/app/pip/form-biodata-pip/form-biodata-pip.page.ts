import { Component, OnInit } from '@angular/core';
import { PpidCmsService } from '../../ppid-cms.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-biodata-pip',
  templateUrl: './form-biodata-pip.page.html',
  styleUrls: ['./form-biodata-pip.page.scss'],
})
export class FormBiodataPipPage implements OnInit {

  biodata:any;
  loading = false;

  constructor(
    private service: PpidCmsService,
    private location: Location
  ) { }

  ngOnInit() {
    if(this.isLogin()){
      this.loadData();
      this.service.CekSession();
    }
  }

  isLogin() {
    return this.service.isLogin();
  }

  goBack(){
    this.location.back();
  }

  loadData(){
    this.loading = false;

    // Load from localStorage
    this.biodata = this.service.getBiodata();
  
    this.loading = true;
  }

}
