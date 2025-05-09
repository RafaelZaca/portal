import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from '../app/Common/shared-material.module';
import { ComponentsModule } from '../app/Common/shared-components.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SobreComponent } from './Pages/Home/sobre/sobre.component';
import { DefaultComponent } from './Layout/Default/default.component';
import { FilterPipe } from './Common/Pipes/filter';
import { RoundPipe } from './Common/Pipes/round';
import { HomeComponent } from './Pages/Home/home/home.component';
import { ErrorDialogComponent } from './Common/modal/error-dialog/error-dialog.component';
import { JwtModule } from '@auth0/angular-jwt';
import { OverviewComponent } from './Pages/OverView/overview/overview.component';
import { OverviewRampaComponent } from './Pages/OverView/overview-rampa/overview-rampa.component';
import { OverviewWaveComponent } from './Pages/OverView/overview-wave/overview-wave.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EmbarqueComponent } from './Pages/Operacional/embarque/embarque.component';
import { ManualComponent } from './Pages/Operacional/manual/manual.component';
import { RampaComponent } from './Pages/Operacional/rampa/rampa.component';
import { SeparacaoComponent } from './Pages/Operacional/separacao/separacao.component';
import { WavesComponent } from './Pages/Operacional/waves/waves.component';
import { GrupoComponent } from './Pages/Cadastro/grupo/grupo.component';
import { LiberacaoComponent } from './Pages/Cadastro/liberacao/liberacao.component';
import { UsuarioComponent } from './Pages/Cadastro/usuario/usuario.component';
import { GeralComponent } from './Pages/Relatorio/geral/geral.component';
import { OverviewRejeitoComponent } from './Pages/OverView/overview-rejeito/overview-rejeito.component';
import { ConfirmDialogComponent } from './Common/modal/confirm-dialog/confirm-dialog.component';
import { PickRequestComponent } from './Pages/Cadastro/pickrequest/pickrequest.component';
import { LoginComponent } from './Pages/Login/login/login.component';
//import { registerLocaleData } from '@angular/common';
//import localeEnUS from '@angular/common/locales/en';
//import localePtBr from '@angular/common/locales/pt-PT';


// Register the 'en-US' locale data
//registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent,
    SobreComponent,
    HomeComponent,
    DefaultComponent,
    FilterPipe,
    RoundPipe,
    ErrorDialogComponent,
    OverviewComponent,
    OverviewRampaComponent,
    OverviewWaveComponent,
    OverviewRejeitoComponent,
    EmbarqueComponent,
    ManualComponent,
    RampaComponent,
    SeparacaoComponent,
    WavesComponent,
    GrupoComponent,
    LiberacaoComponent,
    PickRequestComponent,
    UsuarioComponent,
    GeralComponent,
    ConfirmDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    RouterModule,
    ComponentsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
