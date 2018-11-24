import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Usuario } from "../model/usuario.model";


@Injectable({ providedIn: "root" })
export class UserService {
    public user: Usuario = new Usuario();

    constructor(private http: HttpClient) {
    }
    registrar(usuario: Usuario, callback) {
        var data = {
            "login": usuario.login,
            "nome": usuario.nome,
            "senha": usuario.senha
        }
        this.http.post("http://localhost:3000/usuario/registrar", data).subscribe(response => {
            console.log(response);
            callback(response["msg"]);
        });
    }



    setUser(usuario: Usuario) {
        this.user = usuario;
    }

    setUserClone(usuario: Usuario) {
        this.user.senha = usuario.senha;
        this.user.nome = usuario.nome;
        this.user.login = usuario.login;
        this.user.idUsuario = usuario.idUsuario;
        this.user.cidades_id = usuario.cidades_id;
    }

    registrarGerente(idUser: any, callback) {
        console.log("registrar Gerente " + idUser )
        var data = {
            "idUser": idUser
        }
        this.http.post("http://localhost:3000/usuario/registrar/gerente", data).subscribe(response => {
            console.log(response);
            callback(response["msg"]);
        });
    }
    converterUser(dados: any): Usuario {
        var user = new Usuario();
        user.login = dados["login"];
        user.idUsuario = dados["idusuario"];
        user.nome = dados["nome"];
        user.senha = dados["senha"];
        user.cidades_id = dados["cidades_id"];
        return user;
    }

    //  pensar
    buscarGerenteidUser(idUser,callback) {

        this.http.get("http://localhost:3000/usuario/gerente/" + idUser).subscribe(response => {
            console.log(response);
            callback(response["dados"]);
        });

    }

    buscarUserLogin(login, callback) {
        this.http.get("http://localhost:3000/usuario/by-login/" + login).subscribe(response => {
            console.log(response);
            callback(response["dados"]);
        });

    }
}