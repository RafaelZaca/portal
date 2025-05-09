import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from '../Common/spinner/spinner.module';
import { PermissionDirective } from './Directives/permission.directive';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  declarations: [
    PermissionDirective
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    PermissionDirective
    
  ],
})
export class ComponentsModule { }
