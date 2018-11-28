import { Component, OnInit } from '@angular/core';
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


  constructor(private userService: UserService,
    private restauranteService:RestauranteService) { }

  ngOnInit() {
  }
  buscarUsuarios() {
    var subs: Subscription = this.userService.buscarUserLoginLike(this.nome).subscribe(dados => {
      this.listaUser = dados;
      subs.unsubscribe();
    });

  }
  adicionarColaborador(userSelecionado:Usuario){
    console.log(userSelecionado);

    var subs:Subscription = this.restauranteService.inserirColaborador(userSelecionado.idUsuario)
    .subscribe(flag =>{
      if(flag){
        alert("Colaborador inserido com sucesso");
      }else{
        alert("Problemas ao inserir o colaborador"); 
      }
    });

    
  }
  renderTabela():boolean{
    if(this.listaUser.length == 0){
      return false;
    }
    return true;
  }

}
