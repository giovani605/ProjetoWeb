import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed-lista/feed.component';
import { FeedItemComponent } from './feed/feed-item/feed-item.component';
import { BarraNavegacaoComponent } from './barras/barra-navegacao/barra-navegacao.component';
import { UploadImagemComponent } from './upload/upload-imagem/upload-imagem.component';
import { LoginComponent } from "./auth/login/login.component"
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


const appRoutes: Routes = [
  {path: 'register', component: PaginaRegistroComponent },
  {path: 'home', component: PaginaFeedComponent },
  {path: '', component: PaginaLoginComponent },
  {path: 'login', component: PaginaLoginComponent }
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
    NotificacaoComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
