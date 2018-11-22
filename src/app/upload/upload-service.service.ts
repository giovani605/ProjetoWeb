import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {

  constructor(private http: HttpClient) { }

  public uploadImagem(Imagem: File) {
    var fd = new FormData();
    fd.append('imagem', Imagem, "imagem01.png");
    this.http.post("http://localhost:3000/imagem/upload", fd).subscribe(response => {
      console.log(response);
    });

  }


  public recuperarImagem(id: String, callback) {

    this.http.get("http://localhost:3000/static/e7c3ac57f3719777e420ddee17f5a0c9").subscribe(response => {
      console.log(response);
      callback(response);
    });

  }
}
