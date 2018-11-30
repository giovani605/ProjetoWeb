import { Component, OnInit, Input } from '@angular/core';
import { Prato } from 'src/app/model/prato.model';
import { PratoService } from 'src/app/services/prato.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-reserva',
  templateUrl: './pagina-reserva.component.html',
  styleUrls: ['./pagina-reserva.component.css']
})
export class PaginaReservaComponent implements OnInit {
  public prato: Prato = new Prato();
  public idPrato: number;
  public dataReserva: Date = new Date();

  constructor(
    private pratoService: PratoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idPrato = params['id'];
      const subs: Subscription = this.pratoService
        .recuperarPratoId(this.idPrato)
        .subscribe(prato => {
          this.prato = prato;
          subs.unsubscribe();
        });
    });
  }

  reservar() {
    console.log('oi ' + this.dataReserva);
  }

  returnToHome() {
    this.router.navigate(['/home']);
  }

}
