import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuProfilPpidPage } from './menu-profil-ppid.page';

const routes: Routes = [
  {
    path: '',
    component: MenuProfilPpidPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuProfilPpidPage]
})
export class MenuProfilPpidPageModule {}
