import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../Common/shared-components.module';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    LoginRoutingModule,
    
  ]
})
export class LoginModule { }
