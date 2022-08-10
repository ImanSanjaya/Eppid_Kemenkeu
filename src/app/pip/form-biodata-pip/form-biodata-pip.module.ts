import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormBiodataPipPage } from './form-biodata-pip.page';

const routes: Routes = [
  {
    path: '',
    component: FormBiodataPipPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormBiodataPipPage]
})
export class FormBiodataPipPageModule {}
