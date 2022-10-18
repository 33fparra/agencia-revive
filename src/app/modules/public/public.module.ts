import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ContactoComponent } from './components/contacto/contacto.component';
import { FirebaseDataModule } from 'src/app/code/modules/data/data-module';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    HomeComponent,
    ContactoComponent,
 
  ],
  imports: [
    CommonModule,
    SharedModule,
    PublicRoutingModule,
    FirebaseDataModule,
    TranslateModule.forChild(),
    NgChartsModule
  ]
})
export class PublicModule { }
