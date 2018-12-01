import { Component, OnInit } from '@angular/core';
import { Restaurante } from "../../model/restaurante.model";

import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";
import { RestauranteService } from 'src/app/services/restaurante.service';
import { Cidade } from 'src/app/model/cidade.model';
import { LocalizacaoService } from 'src/app/services/localizacao.service';
import { Subscription } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-registro-restaurante',
  templateUrl: './registro-restaurante.component.html',
  styleUrls: ['./registro-restaurante.component.css']
})
export class RegistroRestauranteComponent implements OnInit {

  public restaurante: Restaurante = new Restaurante();
  public listaCidades: Cidade[] = [];
  public cidadeSelecionada: string = "Selecione";

  constructor(private userService: UserService, private router: Router, private restauranteService: RestauranteService,
    private localizaoService: LocalizacaoService) { }

  ngOnInit() {
    console.log("Usuario :");
    console.log(this.userService.user);
    var subs: Subscription = this.localizaoService.getCidadesObs().subscribe(dados => {
      this.listaCidades = dados;
      subs.unsubscribe();
    });


  }
  changeCidade(cidade) {
    this.restaurante.cidades_id = cidade.idCidade;
    this.cidadeSelecionada = cidade.nome;
    console.log(cidade.idCidade);
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
