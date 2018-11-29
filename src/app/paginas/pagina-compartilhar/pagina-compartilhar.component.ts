import { Component, OnInit } from '@angular/core';
import { Prato } from 'src/app/model/prato.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PratoService } from 'src/app/services/prato.service';

@Component({
  selector: 'app-pagina-compartilhar',
  templateUrl: './pagina-compartilhar.component.html',
  styleUrls: ['./pagina-compartilhar.component.css']
})
export class PaginaCompartilharComponent implements OnInit {

  public prato:Prato =  new Prato();
  public idPrato:number;

  constructor(private pratoService:PratoService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idPrato = params['id'];
      var subs: Subscription = this.pratoService.recuperarPratoId(this.idPrato).subscribe(prato => {
        this.prato = prato;
        subs.unsubscribe();
      });
    });
  }

}
