import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { ContactoComponent } from './components/contacto/contacto.component';


const routes: Routes = [


  // {
  //   path: 'actividades',
  //   component: ActividadesComponent
  // },
  // {
  //   path: 'compromiso',
  //   component: CompromisoComponent
  // },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  // {
  //   path: 'ipa',
  //   component: IndicePrecioAsfaltoComponent
  // },
  // {
  //   path: 'innovacion',
  //   component: InnovacionComponent
  // },
  // {
  //   path: 'quienessomos',
  //   component: QuienesSomosComponent
  // },
  // {
  //   path: 'productos',
  //   component: ProductosComponent
  // },

  {
    path: 'commitment',
    children: [
      {
        path: 'environment',
        component: HomeComponent
      },
      {
        path: 'wellness',
        component: HomeComponent
      },
    ]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
