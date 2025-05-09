import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { OverviewRampaComponent } from './overview-rampa/overview-rampa.component';
import { OverviewWaveComponent } from './overview-wave/overview-wave.component';
import { OverviewRejeitoComponent } from './overview-rejeito/overview-rejeito.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    data: {
    },
    component: OverviewComponent,
  },
  {
    path: 'rampa',
    data: {
    },
    component: OverviewRampaComponent,
  },
  {
    path: 'wave',
    data: {
    },
    component: OverviewWaveComponent,
  },
  {
    path: 'rejeito',
    data: {
    },
    component: OverviewRejeitoComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverViewRoutingModule {}
