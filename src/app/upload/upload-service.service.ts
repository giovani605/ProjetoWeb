import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {

  constructor(private http: HttpClient) { }

  public uploadImagem(Imagem: File) {
    var fd = new FormData();
    fd.append('imagem',Imagem,"imagem01.png");
    this.http.post("http://localhost:3000/imagem/upload", fd).subscribe(response => {
      console.log(response);
    });

  }
}
