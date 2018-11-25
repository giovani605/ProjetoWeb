import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PratoService {

  constructor(private http: HttpClient) { }

  // chamar essa funcao com o prato com todos os dados
  inserirPrato(dadosPrato,Imagem,callback){
    var fd = new FormData();
    var teste = JSON.stringify({"teste": "oi"});
    fd.append('imagem', Imagem, "imagem01.png");
    fd.append('dados', JSON.stringify(dadosPrato));
    fd.append('teste', teste);
    this.http.post("http://localhost:3000/prato/registrar", fd).subscribe(response => {
      console.log(response);
    });


  }
}
