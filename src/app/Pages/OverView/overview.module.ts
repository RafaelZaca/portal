import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../Common/shared-components.module';
import { OverViewRoutingModule } from './overview-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    OverViewRoutingModule,
    
  ]
})
export class OverviewModule { }
