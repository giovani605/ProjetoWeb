import { Component, OnInit } from '@angular/core';
import { UploadServiceService } from '../upload-service.service';

@Component({
  selector: 'app-upload-imagem',
  templateUrl: './upload-imagem.component.html',
  styleUrls: ['./upload-imagem.component.css']
})
export class UploadImagemComponent implements OnInit {

  public arqImagem: File;

  public imagem: any;

  constructor(private uploadService: UploadServiceService) { }

  ngOnInit() {
  }
  onFileChanged(event: any) {
    this.arqImagem = event.target.files[0];
  }
  onUpload() {
    this.uploadService.uploadImagem(this.arqImagem);
  }
  recuperarImagem() {
    this.uploadService.recuperarImagem("e7c3ac57f3719777e420ddee17f5a0c9", (resultado) => {
      this.imagem = resultado;
    });
  }

}
