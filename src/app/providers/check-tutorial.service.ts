import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckTutorial implements CanLoad {
  constructor(private router: Router) {}

  canLoad() {
    var values = false;

    if (localStorage.getItem('ion_did_welcome') == 'true') {
      this.router.navigate(['/home']);
      values = false;
    } else {
      values = true;
    }

    return values;

  }
}
