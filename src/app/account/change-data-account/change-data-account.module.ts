import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChangeDataAccountPage } from './change-data-account.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeDataAccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangeDataAccountPage]
})
export class ChangeDataAccountPageModule {}
