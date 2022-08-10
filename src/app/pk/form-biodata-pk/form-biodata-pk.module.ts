import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormBiodataPkPage } from './form-biodata-pk.page';

const routes: Routes = [
  {
    path: '',
    component: FormBiodataPkPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormBiodataPkPage]
})
export class FormBiodataPkPageModule {}
