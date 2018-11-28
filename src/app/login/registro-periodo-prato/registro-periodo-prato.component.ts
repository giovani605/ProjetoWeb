import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PratoDia } from 'src/app/model/pratoDia.model';
import { Prato } from 'src/app/model/prato.model';
import { PratoService } from 'src/app/services/prato.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { DiaSemana, getListaDias } from '../../model/diaSemana.model';
@Component({
  selector: 'app-registro-periodo-prato',
  templateUrl: './registro-periodo-prato.component.html',
  styleUrls: ['./registro-periodo-prato.component.css']
})
export class RegistroPeriodoPratoComponent implements OnInit {

  private idPrato: string;
  private prato: Prato = new Prato();
  private pratoDia: PratoDia = new PratoDia();
  public tipo: boolean = false; // true para inserir um dia false para isnerir com repitação

  private listaDias: any[] = getListaDias();

  constructor(private route: ActivatedRoute,
    private pratoService: PratoService,
    private userService: UserService,
    private router: Router) { }

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
    this.pratoDia.data_fim = this.pratoDia.data_inicio;
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

  }
  changeStatus(a:DiaSemana) {
    a.mark = !a.mark;
  }

}
