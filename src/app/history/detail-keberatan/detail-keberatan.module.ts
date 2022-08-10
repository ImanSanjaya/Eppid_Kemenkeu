import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailKeberatanPage } from './detail-keberatan.page';

const routes: Routes = [
  {
    path: '',
    component: DetailKeberatanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailKeberatanPage]
})
export class DetailKeberatanPageModule {}
