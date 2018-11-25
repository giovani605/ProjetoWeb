import { Component, OnInit } from '@angular/core';
import { Prato } from 'src/app/model/prato.model';
import { PratoService } from 'src/app/services/prato.service';

@Component({
  selector: 'app-registro-prato',
  templateUrl: './registro-prato.component.html',
  styleUrls: ['./registro-prato.component.css']
})
export class RegistroPratoComponent implements OnInit {

  public prato: Prato = new Prato();
  public arqImagem: File;
  constructor(private pratoService: PratoService) { }

  ngOnInit() {
  }
  onFileChanged(event: any) {
    this.arqImagem = event.target.files[0];
  }

  onSubmit() {
    // place holder
    // fazer um jeito de conseguir todos os dados que sao id
    this.prato.restaurante_idrestaurante = "1";
    this.prato.tag_idtag = "1";
    this.pratoService.inserirPrato(this.prato, this.arqImagem, (resultado) => {
      console.log(resultado);
    });

  }

}
