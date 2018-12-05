import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-user',
  templateUrl: './pagina-user.component.html',
  styleUrls: ['./pagina-user.component.css']
})
export class PaginaUserComponent implements OnInit {

  public user: Usuario = new Usuario();

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params["id"];
      this.userService.buscarUsuarioIdUser(id).subscribe(dados => {
        this.user = dados;
      })
    });


  }

}
