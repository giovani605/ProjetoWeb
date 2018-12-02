import { Component, OnInit } from '@angular/core';
import { Notificacao } from 'src/app/model/notificacao.model';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-notificacoes',
  templateUrl: './pagina-notificacoes.component.html',
  styleUrls: ['./pagina-notificacoes.component.css']
})
export class PaginaNotificacoesComponent implements OnInit {

  public listaNotificacoes: Notificacao[] = []

  constructor(private userService: UserService,
    private router:Router) { }

  ngOnInit() {
    var subs1: Subscription = this.userService.buscarNotificacoesUserId(this.userService.getUserId()).subscribe(dados => {
      this.listaNotificacoes = dados;
      subs1.unsubscribe();
    });
  }
  redirecionar(link){
    this.router.navigate([link]);
  }

}
