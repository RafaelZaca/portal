import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrupoComponent } from './grupo/grupo.component';
import { LiberacaoComponent } from './liberacao/liberacao.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PickRequestComponent } from './pickrequest/pickrequest.component';

const routes: Routes = [
  { path: '', redirectTo: 'usuario', pathMatch: 'full' },
  {
    path: 'grupo',
    component: GrupoComponent,
    data: { requiredPermission: 'GRUPO_VIEW' }
  },
  {
    path: 'liberacao',
    component: LiberacaoComponent,
    data: { requiredPermission: 'USUARIO_VIEW' }
  },
  {
    path: 'pickrequest',
    component: PickRequestComponent,
    data: { requiredPermission: 'PICKREQUEST_VIEW' }
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    data: { requiredPermission: 'USUARIO_VIEW' }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroRoutingModule {}
