import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../Common/shared-components.module';
import { RelatorioRoutingModule } from './relatorio-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RelatorioRoutingModule,
    
  ]
})
export class RelatorioModule { }
