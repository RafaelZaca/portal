import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './Layout/Default/default.component';
import { LoginComponent } from './Pages/Login/login/login.component';
import { PermissionGuard } from './Common/AuthGuard/AuthGuard';
//import { LoginComponent } from './Pages/Login/login/login.component'

const routes: Routes = [
  { path: '', redirectTo: 'entrar', pathMatch: 'full' },
  { path: 'entrar', component: LoginComponent },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Pages/Login/login.module').then(
            (m) => m.LoginModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./Pages/Home/home.module').then(
            (m) => m.HomeModule),
      },
      {
        path: 'overview',
        loadChildren: () =>
          import('./Pages/OverView/overview.module').then(
            (m) => m.OverviewModule),
        canActivate: [PermissionGuard],
      },
      {
        path: 'cadastro',
        loadChildren: () =>
          import('./Pages/Cadastro/cadastro.module').then(
            (m) => m.CadastroModule),
        canActivate: [PermissionGuard],
      },
      {
        path: 'operacional',
        loadChildren: () =>
          import('./Pages/Operacional/operacional.module').then(
            (m) => m.OperacionalModule),
        canActivate: [PermissionGuard],
      },
      {
        path: 'relatorios',
        loadChildren: () =>
          import('./Pages/Relatorio/relatorio.module').then(
            (m) => m.RelatorioModule),
        canActivate: [PermissionGuard],
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
