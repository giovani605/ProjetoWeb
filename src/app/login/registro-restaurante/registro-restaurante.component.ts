import { Component, OnInit } from '@angular/core';
import { Restaurante } from "../../model/restaurante.model";

import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";
import { RestauranteService } from 'src/app/services/restaurante.service';
@Component({
  selector: 'app-registro-restaurante',
  templateUrl: './registro-restaurante.component.html',
  styleUrls: ['./registro-restaurante.component.css']
})
export class RegistroRestauranteComponent implements OnInit {

  public restaurante: Restaurante = new Restaurante();


  constructor(private userService: UserService, private router: Router, private restauranteService: RestauranteService) { }

  ngOnInit() {
    console.log("Usuario :");
    console.log(this.userService.user);
  }

  onSubmit() {
    // registrar o usuario como um gerente
    this.userService.registrarGerente(this.userService.user.idUsuario, (resposta) => {
      this.userService.buscarGerenteidUser(this.userService.user.idUsuario, (gerente) => {
        this.restauranteService.registrarRestaurante(gerente["idgerente"], this.restaurante, (resultado) => {
          this.router.navigate(["/"]);
          alert("Cadastro com sucesso");
        });
      });


    });

    // registrar o restaurante
  }

}
