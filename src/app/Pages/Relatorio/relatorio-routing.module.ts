import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeralComponent } from './geral/geral.component';

const routes: Routes = [
  { path: '', redirectTo: 'relatorio', pathMatch: 'full' },
  {
    path: 'relatorio',
    data: {
    },
    component: GeralComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioRoutingModule {}
