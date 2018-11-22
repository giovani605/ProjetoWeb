import { Component, OnInit } from '@angular/core';
import { UploadServiceService } from '../upload-service.service';

@Component({
  selector: 'app-upload-imagem',
  templateUrl: './upload-imagem.component.html',
  styleUrls: ['./upload-imagem.component.css']
})
export class UploadImagemComponent implements OnInit {

  public arqImagem: File;

  constructor(private uploadService: UploadServiceService) { }

  ngOnInit() {
  }
  onFileChanged(event: any) {
    this.arqImagem = event.target.files[0];
  }
  onUpload() {
    this.uploadService.uploadImagem(this.arqImagem);
  }

}
