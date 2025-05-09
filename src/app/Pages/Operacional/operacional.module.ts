import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../Common/shared-components.module';
import { OperacionalRoutingModule } from './operacional-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    OperacionalRoutingModule,
    
  ]
})
export class OperacionalModule { }
