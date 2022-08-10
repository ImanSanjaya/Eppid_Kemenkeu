import { Component, OnInit } from '@angular/core';
import { PpidCmsService } from '../../ppid-cms.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-form-biodata-pk',
  templateUrl: './form-biodata-pk.page.html',
  styleUrls: ['./form-biodata-pk.page.scss'],
})
export class FormBiodataPkPage implements OnInit {

  biodata;
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
