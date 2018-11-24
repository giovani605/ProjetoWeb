import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Usuario } from "../model/usuario.model";


@Injectable({ providedIn: "root" })
export class UserService {
    public usuario: any;
    public token: any;
   

    constructor(private http: HttpClient) {
    }
    registrar(usuario:Usuario){
        var data = {
            "login" : usuario.login,
            "nome" : usuario.nome,
            "senha" : usuario.senha
        }
        this.http.post("http://localhost:3000/usuario/registrar", data).subscribe(response => {
            console.log(response);
            alert(response["msg"]);
        });
    }

    

}