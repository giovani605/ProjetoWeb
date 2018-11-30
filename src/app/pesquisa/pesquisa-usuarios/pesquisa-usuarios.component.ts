import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/model/usuario.model';
import { Subscription } from 'rxjs';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-pesquisa-usuarios',
  templateUrl: './pesquisa-usuarios.component.html',
  styleUrls: ['./pesquisa-usuarios.component.css']
})
export class PesquisaUsuariosComponent implements OnInit {

  public nome: string = "";
  public listaUser: Usuario[] = [];
  @Input('tipoPesquisa')
  public tipoPesquisa = 1; // 1 - adioionar colaborador
  // 2 - adicionar amigos


  constructor(private userService: UserService,
    private restauranteService: RestauranteService) { }

  isVazia() {
    if (this.listaUser.length == 0) {
      console.log("return " + true);
      return true;
    }
    console.log("return " + false);
    return false;
  }

  ngOnInit() {
  }
  buscarUsuarios() {
    var subs: Subscription = this.userService.buscarUserLoginLike(this.nome).subscribe(dados => {
      this.listaUser = dados;
      subs.unsubscribe();
    });

  }
  nomeBotao(){
    if (this.tipoPesquisa == 1) {
      return "Adicionar Colaborador";
    } else if (this.tipoPesquisa == 2) {
      return "Adicionar Amigo";
    }
  }

  adicionar(userSelecionado: Usuario) {
    if (this.tipoPesquisa == 1) {
      this.adicionarColaborador(userSelecionado);
    } else if (this.tipoPesquisa == 2) {
      this.adicionarAmigo(userSelecionado);
    }
  }
  adicionarAmigo(userSelecionado: Usuario) {
    console.log(userSelecionado);


    var subs: Subscription = this.userService.inserirAmigos(this.userService.getUserId(),userSelecionado.idUsuario)
      .subscribe(dados => {
        if (dados["flag"]) {
          alert("Amigo adicionado com sucesso");
        } else {
          alert("Problemas ao adicionar o amigo");
        }
        subs.unsubscribe();
      });


  }


  adicionarColaborador(userSelecionado: Usuario) {
    console.log(userSelecionado);

    var subs: Subscription = this.restauranteService.inserirColaborador(userSelecionado.idUsuario)
      .subscribe(flag => {
        if (flag) {
          alert("Colaborador inserido com sucesso");
        } else {
          alert("Problemas ao inserir o colaborador");
        }
      });


  }
  renderTabela(): boolean {
    if (this.listaUser.length == 0) {
      return false;
    }
    return true;
  }

}
