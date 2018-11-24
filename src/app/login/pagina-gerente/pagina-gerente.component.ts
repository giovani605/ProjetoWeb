import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";

import { Usuario } from 'src/app/model/usuario.model';
@Component({
  selector: 'app-pagina-gerente',
  templateUrl: './pagina-gerente.component.html',
  styleUrls: ['./pagina-gerente.component.css']
})
export class PaginaGerenteComponent implements OnInit {

  public user: Usuario = new Usuario();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("chamando o servico");
    this.userService.registrar(this.user, (msg) => {
      this.router.navigate(["/"]);
    });
  }

}
