import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailPermohonanPage } from './detail-permohonan.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPermohonanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailPermohonanPage]
})
export class DetailPermohonanPageModule {}
