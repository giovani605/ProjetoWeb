import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pagina-registro',
  templateUrl: './pagina-registro.component.html',
  styleUrls: ['./pagina-registro.component.css']
})
export class PaginaRegistroComponent implements OnInit {

  public user: Usuario = new Usuario();

  constructor(private userService:UserService) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log("chamando o servico");
    this.userService.registrar(this.user);
  }

}
