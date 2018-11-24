import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";

import { HttpClient, HttpParams } from '@angular/common/http';
// recuperar argumentod a url
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-registro',
  templateUrl: './pagina-registro.component.html',
  styleUrls: ['./pagina-registro.component.css']
})
export class PaginaRegistroComponent implements OnInit {

  public user: Usuario = new Usuario();
  private gerente: number; // para indicar se estou cadastrando um gerente
  // 1 - sim
  // 0 - Não

  constructor(private userService: UserService, private router: Router, private rota: ActivatedRoute) { }

  ngOnInit() {
    this.rota.queryParams.subscribe(params => {
      console.log(params);
      this.gerente = params['gerente'];
      console.log(this.gerente);
    });
  }
  onSubmit() {
    console.log("chamando o servico");
    this.userService.registrar(this.user, (msg) => {

      if (this.gerente == 1) {
        // routear para a pagina do restaurante
        this.userService.buscarUserLogin(this.user.login, (usuario)=>{
          var a:Usuario = this.userService.converterUser(usuario);
          this.userService.setUserClone(a);
          this.router.navigate(["/register/restaurante"]);
        })


        
      } else {
        alert(msg);
        this.router.navigate(["/"]);
      }

    });
  }

}
