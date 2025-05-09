import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../Common/shared-components.module';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    HomeRoutingModule,
    
  ]
})
export class HomeModule { }
