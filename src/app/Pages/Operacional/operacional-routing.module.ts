import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmbarqueComponent } from './embarque/embarque.component';
import { RampaComponent } from './rampa/rampa.component';
import { SeparacaoComponent } from './separacao/separacao.component';
import { WavesComponent } from './waves/waves.component';
import { ManualComponent } from './manual/manual.component';
import { PermissionGuard } from '../../Common/AuthGuard/AuthGuard';

const routes: Routes = [
  { path: '', redirectTo: 'waves', pathMatch: 'full' },
  {
    path: 'embarque',
    component: EmbarqueComponent,
    canActivate: [PermissionGuard],
    data: { requiredPermission: 'EMBARQUE_VIEW' }
  },
  {
    path: 'embarque/:id',
    component: EmbarqueComponent,
    canActivate: [PermissionGuard],
    data: { requiredPermission: 'EMBARQUE_VIEW' }
  },
  {
    path: 'manual',
    component: ManualComponent,
    canActivate: [PermissionGuard],
    data: { requiredPermission: 'TRIAGEM_MANUAL_VIEW' }
  },
  {
    path: 'rampa',
    component: RampaComponent,
    canActivate: [PermissionGuard],
    data: { requiredPermission: 'RAMPA_VIEW' }
  },
  {
    path: 'separacao',
    component: SeparacaoComponent,
    canActivate: [PermissionGuard],
    data: { requiredPermission: 'SEPARACAO_VIEW' }
  },
  {
    path: 'waves',
    component: WavesComponent,
    canActivate: [PermissionGuard],
    data: { requiredPermission: 'WAVES_VIEW' }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperacionalRoutingModule {}
