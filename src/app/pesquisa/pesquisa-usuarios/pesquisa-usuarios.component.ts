import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/model/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pesquisa-usuarios',
  templateUrl: './pesquisa-usuarios.component.html',
  styleUrls: ['./pesquisa-usuarios.component.css']
})
export class PesquisaUsuariosComponent implements OnInit {

  public nome: string = "";
  public listaUser: Usuario[] = [];


  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  buscarUsuarios() {
    var subs: Subscription = this.userService.buscarUserLoginLike(this.nome).subscribe(dados => {
      this.listaUser = dados;
      subs.unsubscribe();
    });

  }

}
