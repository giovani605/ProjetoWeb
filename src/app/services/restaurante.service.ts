import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  constructor(private http: HttpClient) { }

  registrarRestaurante(idGerente,dadosRestaurante,callback){
    var data = {
      "idGerente" : idGerente,
      "dadosRestaurante" : dadosRestaurante
    }
    this.http.post("http://localhost:3000/restaurante/registrar", data).subscribe(response => {
            console.log(response);
            callback(response["msg"]);
        });

  }

}
