import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome-info',
    pathMatch: 'full'
  },
  {
    path: 'welcome-info',
    loadChildren: () => import('./welcome-info/welcome-info.module').then( m => m.WelcomeInfoPageModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'all',
    loadChildren: () => import('./history/all/all.module').then( m => m.AllPageModule)
  },
  {
    path: 'detail-keberatan/:id',
    loadChildren: () => import('./history/detail-keberatan/detail-keberatan.module').then( m => m.DetailKeberatanPageModule)
  },
  {
    path: 'detail-permohonan/:id',
    loadChildren: () => import('./history/detail-permohonan/detail-permohonan.module').then( m => m.DetailPermohonanPageModule)
  },
  {
    path: 'form-registration',
    loadChildren: () => import('./registration/form-registration/form-registration.module').then( m => m.FormRegistrationPageModule)
  },
  {
    path: 'success-registration',
    loadChildren: () => import('./registration/success-registration/success-registration.module').then( m => m.SuccessRegistrationPageModule)
  },
  {
    path: 'view-account',
    loadChildren: () => import('./account/view-account/view-account.module').then( m => m.ViewAccountPageModule)
  },
  {
    path: 'success-account',
    loadChildren: () => import('./account/success-account/success-account.module').then( m => m.SuccessAccountPageModule)
  },
  {
    path: 'change-data-account',
    loadChildren: () => import('./account/change-data-account/change-data-account.module').then( m => m.ChangeDataAccountPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./authentication/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./authentication/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'form-pip',
    loadChildren: () => import('./pip/form-pip/form-pip.module').then( m => m.FormPipPageModule)
  },
  {
    path: 'success-pip',
    loadChildren: () => import('./pip/success-pip/success-pip.module').then( m => m.SuccessPipPageModule)
  },
  {
    path: 'form-pk',
    loadChildren: () => import('./pk/form-pk/form-pk.module').then( m => m.FormPkPageModule)
  },
  {
    path: 'success-pk',
    loadChildren: () => import('./pk/success-pk/success-pk.module').then( m => m.SuccessPkPageModule)
  },
  {
    path: 'menu-informasi-publik',
    loadChildren: () => import('./other-menu/menu-informasi-publik/menu-informasi-publik.module').then( m => m.MenuInformasiPublikPageModule)
  },
  {
    path: 'menu-profil-ppid',
    loadChildren: () => import('./other-menu/menu-profil-ppid/menu-profil-ppid.module').then( m => m.MenuProfilPpidPageModule)
  },
  {
    path: 'menu-standar-layanan',
    loadChildren: () => import('./other-menu/menu-standar-layanan/menu-standar-layanan.module').then( m => m.MenuStandarLayananPageModule)
  },
  {
    path: 'page/:title/:page',
    loadChildren: () => import('./dynamic-template/page/page.module').then( m => m.PagePageModule)
  },
  {
    path: 'post/:title/:page',
    loadChildren: () => import('./dynamic-template/post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'form-biodata-pip',
    loadChildren: () => import('./pip/form-biodata-pip/form-biodata-pip.module').then( m => m.FormBiodataPipPageModule)
  },
  {
    path: 'form-biodata-pk',
    loadChildren: () => import('./pk/form-biodata-pk/form-biodata-pk.module').then( m => m.FormBiodataPkPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule],
  declarations: [
    
  ]
})
export class AppRoutingModule {}
