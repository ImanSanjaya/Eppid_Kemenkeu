import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuStandarLayananPage } from './menu-standar-layanan.page';

const routes: Routes = [
  {
    path: '',
    component: MenuStandarLayananPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuStandarLayananPage]
})
export class MenuStandarLayananPageModule {}
