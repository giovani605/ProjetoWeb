import { Component, OnInit } from '@angular/core';
import { Prato } from 'src/app/model/prato.model';
import { PratoService } from 'src/app/services/prato.service';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-registro-prato',
  templateUrl: './registro-prato.component.html',
  styleUrls: ['./registro-prato.component.css']
})
export class RegistroPratoComponent implements OnInit {

  public prato: Prato = new Prato();
  public arqImagem: File;
  constructor(private pratoService: PratoService,
    private restauranteService:RestauranteService) { }

  ngOnInit() {
  }
  onFileChanged(event: any) {
    this.arqImagem = event.target.files[0];
  }

  onSubmit() {
    // place holder
    // fazer um jeito de conseguir todos os dados que sao id
    this.prato.restaurante_idrestaurante = this.restauranteService.getIdRestaurante();
    console.log("Restaurante ID: " + this.restauranteService.getIdRestaurante());
    this.prato.tag_idtag = "1";
    this.pratoService.inserirPrato(this.prato, this.arqImagem, (resultado) => {
        if(resultado["flag"]){
          alert("inserido com sucesso");
        }else{
          alert("Não foi possivel inserir");
        }
    });

  }

}
