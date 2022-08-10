import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('biodata');
    localStorage.removeItem('permohonanSaya');
    localStorage.removeItem('keberatanSaya');
    localStorage.removeItem('token');
    localStorage.setItem('logout_time', moment().format('DD-MM-YYYY HH:mm:ss') );
    this.router.navigateByUrl('home');
  }

}
