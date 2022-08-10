import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuInformasiPublikPage } from './menu-informasi-publik.page';

const routes: Routes = [
  {
    path: '',
    component: MenuInformasiPublikPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuInformasiPublikPage]
})
export class MenuInformasiPublikPageModule {}
