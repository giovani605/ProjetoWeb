import { HttpClient } from '@angular/common/http';
import { Comentario } from './../model/comentario.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private subComentariosPrato: Subject<Comentario[]> = new Subject<Comentario[]>();

  constructor(private http: HttpClient) { }

  buscaUltimosComentariosRestaurante(id: number) {
    let subComentariosRestaurante: Subject<Comentario[]> = new Subject<Comentario[]>();
    this.http.post("http://localhost:3000/restaurante/registrar", data).subscribe(response => {


    });
    return subComentariosRestaurante.asObservable();
  }

}
