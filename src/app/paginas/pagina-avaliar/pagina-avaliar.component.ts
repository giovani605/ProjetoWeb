import { Component, OnInit } from '@angular/core';
import { Prato } from 'src/app/model/prato.model';
import { PratoService } from 'src/app/services/prato.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagina-avaliar',
  templateUrl: './pagina-avaliar.component.html',
  styleUrls: ['./pagina-avaliar.component.css']
})
export class PaginaAvaliarComponent implements OnInit {

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
  confirmar(){
    
  }

}
