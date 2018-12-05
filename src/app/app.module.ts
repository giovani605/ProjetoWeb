import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed-lista/feed.component';
import { FeedItemComponent } from './feed/feed-item/feed-item.component';
import { BarraNavegacaoComponent } from './barras/barra-navegacao/barra-navegacao.component';
import { UploadImagemComponent } from './upload/upload-imagem/upload-imagem.component';
import { LoginComponent } from './auth/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { PaginaLoginComponent } from './login/pagina-login/pagina-login.component';
import { PaginaRegistroComponent } from './login/pagina-registro/pagina-registro.component';
import { PaginaFeedComponent } from './paginas/pagina-feed/pagina-feed.component';
import { RegistroUserComponent } from './login/registro-user/registro-user.component';
import { RegistroRestauranteComponent } from './login/registro-restaurante/registro-restaurante.component';
import { PaginaRestauranteComponent } from './paginas/perfil/pagina-restaurante/pagina-restaurante.component';
import { PaginaUsuarioComponent } from './paginas/perfil/pagina-usuario/pagina-usuario.component';
import { PaginaAdmRestauranteComponent } from './paginas/admin/pagina-adm-restaurante/pagina-adm-restaurante.component';
import { NotificacaoComponent } from './notificacao/notificacao/notificacao.component';
import { PaginaGerenteComponent } from './login/pagina-gerente/pagina-gerente.component';
import { RegistroPratoComponent } from './login/registro-prato/registro-prato.component';
import { ItemPratoComponent } from './lista/item-prato/item-prato.component';
import { RegistroPeriodoPratoComponent } from './login/registro-periodo-prato/registro-periodo-prato.component';
import { BarraLateralComponent } from './barras/barra-lateral/barra-lateral.component';
import { UserService } from './services/user.service';
import { PaginaColaboradoresComponent } from './paginas/admin/pagina-colaboradores/pagina-colaboradores.component';
import { ListaUsuarioComponent } from './lista/lista-usuario/lista-usuario.component';
import { PesquisaUsuariosComponent } from './pesquisa/pesquisa-usuarios/pesquisa-usuarios.component';
import { ModalReservaComponent } from './modal/modal-reserva/modal-reserva.component';
import { PaginaReservaComponent } from './paginas/pagina-reserva/pagina-reserva.component';
import { PaginaAvaliarComponent } from './paginas/pagina-avaliar/pagina-avaliar.component';
import { PaginaCompartilharComponent } from './paginas/pagina-compartilhar/pagina-compartilhar.component';
import { PaginaAmigosComponent } from './paginas/pagina-amigos/pagina-amigos.component';
import { PaginaReservasUsuarioComponent } from './paginas/pagina-reservas-usuario/pagina-reservas-usuario.component';
import { PaginaReservasRestauranteComponent } from './paginas/pagina-reservas-restaurante/pagina-reservas-restaurante.component';
import { CidadeComponent } from './genericos/cidade/cidade.component';
import { PesquisaPratoRestauranteComponent } from './pesquisa/pesquisa-prato-restaurante/pesquisa-prato-restaurante.component';
import { PaginaAprovarCarpadioComponent } from './paginas/admin/pagina-aprovar-carpadio/pagina-aprovar-carpadio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginaNotificacoesComponent } from './paginas/pagina-notificacoes/pagina-notificacoes.component';
import { ItemUsuarioComponent } from './lista/item-usuario/item-usuario.component';
import { PaginaUserComponent } from './paginas/perfil/pagina-user/pagina-user.component';

const appRoutes: Routes = [
  { path: 'register', component: PaginaRegistroComponent },
  { path: 'home', canActivate: [UserService], component: PaginaFeedComponent },
  {
    path: 'page/user', canActivate: [UserService],
    component: PaginaUsuarioComponent
  },
  { path: '', component: PaginaLoginComponent },
  { path: 'login', component: PaginaLoginComponent },
  { path: 'register/restaurante', component: RegistroRestauranteComponent },
  { path: 'register/prato', canActivate: [UserService], component: RegistroPratoComponent },
  { path: 'admin/restaurante', canActivate: [UserService], component: PaginaAdmRestauranteComponent },
  { path: 'registro/periodo/:id', canActivate: [UserService], component: RegistroPeriodoPratoComponent },
  {
    path: 'admin/restaurante/colaboradores', canActivate: [UserService, PaginaColaboradoresComponent],
    component: PaginaColaboradoresComponent
  },
  { path: 'restaurante/:id', canActivate: [UserService], component: PaginaRestauranteComponent },
  { path: 'prato/reservar/:id', canActivate: [UserService], component: PaginaReservaComponent },
  { path: 'prato/compartilhar/:id', canActivate: [UserService], component: PaginaCompartilharComponent },
  { path: 'prato/:id', canActivate: [UserService], component: PaginaCompartilharComponent },
  { path: 'prato/avaliar/:id', canActivate: [UserService], component: PaginaAvaliarComponent },
  { path: 'usuario/reservas', canActivate: [UserService], component: PaginaReservasUsuarioComponent },
  { path: 'usuario/amigos', canActivate: [UserService], component: PaginaAmigosComponent },
  { path: 'restaurates/reservar', canActivate: [UserService], component: PaginaReservasRestauranteComponent },
  {
    path: 'admin/restaurante/aprovar', canActivate: [UserService, PaginaColaboradoresComponent],
    component: PaginaAprovarCarpadioComponent
  }, { path: 'usuario/notificacoes', canActivate: [UserService], component: PaginaNotificacoesComponent },
  { path: 'perfil/usuario/:id', canActivate: [UserService], component: PaginaUserComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    FeedItemComponent,
    BarraNavegacaoComponent,
    UploadImagemComponent,
    LoginComponent,
    PaginaLoginComponent,
    PaginaRegistroComponent,
    PaginaFeedComponent,
    RegistroUserComponent,
    RegistroRestauranteComponent,
    PaginaRestauranteComponent,
    PaginaUsuarioComponent,
    PaginaAdmRestauranteComponent,
    NotificacaoComponent,
    PaginaGerenteComponent,
    RegistroPratoComponent,
    ItemPratoComponent,
    RegistroPeriodoPratoComponent,
    BarraLateralComponent,
    PaginaColaboradoresComponent,
    ListaUsuarioComponent,
    PesquisaUsuariosComponent,
    ModalReservaComponent,
    PaginaReservaComponent,
    PaginaAvaliarComponent,
    PaginaCompartilharComponent,
    PaginaAmigosComponent,
    PaginaReservasUsuarioComponent,
    PaginaReservasRestauranteComponent,
    CidadeComponent,
    PesquisaPratoRestauranteComponent,
    PaginaAprovarCarpadioComponent,
    PaginaNotificacoesComponent,
    ItemUsuarioComponent,
    PaginaUserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    NgbModule.forRoot()
  ],
  providers: [UserService, PaginaColaboradoresComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
