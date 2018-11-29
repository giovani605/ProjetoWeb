import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PratoDia } from 'src/app/model/pratoDia.model';
import { Prato } from 'src/app/model/prato.model';
import { PratoService } from 'src/app/services/prato.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { DiaSemana, getListaDias } from '../../model/diaSemana.model';
import { PeriodoPratoDia } from 'src/app/model/periodo.model';
import { RestauranteService } from 'src/app/services/restaurante.service';
@Component({
  selector: 'app-registro-periodo-prato',
  templateUrl: './registro-periodo-prato.component.html',
  styleUrls: ['./registro-periodo-prato.component.css']
})
export class RegistroPeriodoPratoComponent implements OnInit {

  private idPrato: string;
  private prato: Prato = new Prato();
  private pratoDia: PratoDia = new PratoDia();
  private periodo: PeriodoPratoDia = new PeriodoPratoDia();
  public tipo: boolean = false; // true para inserir um dia false para isnerir com repitação

  private listaDias: DiaSemana[] = getListaDias();

  constructor(private route: ActivatedRoute,
    private pratoService: PratoService,
    private userService: UserService,
    private router: Router,
    private restauranteService: RestauranteService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idPrato = params['id'];
      var subs: Subscription = this.pratoService.recuperarPratoId(this.idPrato).subscribe(prato => {
        this.prato = prato;
        subs.unsubscribe();
      });
    });
  }
  alterar() {
    this.tipo = !this.tipo;
  }
  onSubmit() {
    this.pratoDia.aprovado = 1;
    this.pratoDia.responsavel = this.userService.getUserId();
    this.pratoDia.idPrato = this.idPrato;

    this.pratoService.inserirPratoDiaSimples(this.pratoDia, (resultado) => {
      if (resultado["flag"]) {
        alert("Registro Inserido com sucesso");
        this.router.navigate(['admin/restaurante']);
      } else {
        alert("Falha ao inserir");
      }
    });
  }
  onSubmitRepetido() {
    console.log(this.listaDias);

    this.periodo.idprato = this.prato.idpratos;

    this.periodo.responsavel = this.userService.getUserId();

    if (this.restauranteService.isGerente()) {
      this.periodo.aprovado = 1;
    } else {
      this.periodo.aprovado = 0;
    }
    
    var subs: Subscription = this.pratoService.inserirPratoDiaCiclo(this.periodo.responsavel,this.periodo,this.listaDias).subscribe(dados => {
      if (dados["flag"]) {
        alert("sucesso");
      } else {
        alert("nao foi possivel inserir");
      }
      subs.unsubscribe();
    });
  }
  changeStatus(a: DiaSemana) {
    a.mark = !a.mark;
  }

}
