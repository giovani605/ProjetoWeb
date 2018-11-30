import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/model/usuario.model';
import { Subscription } from 'rxjs';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

  @Input('lista') private listaUser: Usuario[] = [];
  @Input('tipo') private tipo: string;

  constructor(private restauranteService: RestauranteService,
    private userService:UserService) { }

  ngOnInit() {
    console.log("oie " + this.tipo);
    if (this.tipo == "colaboradores") {
      
      var subs: Subscription = this.restauranteService.
        procurarColaboradores(this.restauranteService.getIdGerente()).subscribe(dados => {
          this.listaUser = dados;
          subs.unsubscribe();
        });
    }
    if (this.tipo == "amigos") {
      
      var subs: Subscription = this.userService.
        procurarAmigos(this.userService.getUserId).subscribe(dados => {
          this.listaUser = dados;
          subs.unsubscribe();
        });
    }


  }
}
