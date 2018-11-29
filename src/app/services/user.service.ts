import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Usuario } from '../model/usuario.model';
import { CanActivate, Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class UserService implements CanActivate {
    public user: Usuario = new Usuario();
    private isAuth = false;

    canActivate() {
        if (!this.isAuth) {
            this.router.navigate(['login']);
            return false;
        }
        return this.isAuth;
    }


    getUserId() {
        return this.user.idUsuario;
    }

    constructor(private http: HttpClient, private router: Router) {
    }

    registrar(usuario: Usuario, callback) {
        const data = {
            'login': usuario.login,
            'nome': usuario.nome,
            'senha': usuario.senha
        };
        this.http.post('http://localhost:3000/usuario/registrar', data).subscribe(response => {
            console.log(response);
            callback(response['msg']);
        });
    }

    logar(usuario: Usuario) {
        this.setUserClone(usuario);
        this.isAuth = true;
    }

    setUser(usuario: Usuario) {
        this.user = usuario;
    }

    public getUser(): Usuario {
      return this.user;
    }

    converterUserBackdados(a) {
        const user = new Usuario();
        user.login = a['login'];
        user.idUsuario = a['idusuario'];
        user.nome = a['nome'];
        user.senha = a['senha'];
        user.cidades_id = a['cidades_id'];
        return user;
    }

    setUserClone(usuario: Usuario) {
        console.log('setando o usuario ' + usuario.idUsuario);
        this.user.senha = usuario.senha;
        this.user.nome = usuario.nome;
        this.user.login = usuario.login;
        this.user.idUsuario = usuario.idUsuario;
        this.user.cidades_id = usuario.cidades_id;
    }

    registrarGerente(idUser: any, callback) {
        console.log('registrar Gerente ' + idUser);
        const data = {
            'idUser': idUser
        };
        this.http.post('http://localhost:3000/usuario/registrar/gerente', data).subscribe(response => {
            console.log(response);
            callback(response['msg']);
        });
    }
    converterUser(dados: any): Usuario {
        const user = new Usuario();
        user.login = dados['login'];
        user.idUsuario = dados['idusuario'];
        user.nome = dados['nome'];
        user.senha = dados['senha'];
        user.cidades_id = dados['cidades_id'];
        return user;
    }

    //  pensar
    buscarGerenteidUser(idUser, callback) {

        this.http.get('http://localhost:3000/usuario/gerente/' + idUser).subscribe(response => {
            console.log(response);
            callback(response['dados']);
        });

    }

    buscarUserLogin(login, callback) {
        this.http.get('http://localhost:3000/usuario/by-login/' + login).subscribe(response => {
            console.log(response);
            callback(response['dados']);
        });

    }

    buscarUserLoginLike(login) {
        console.log('buscarUserLoginLike ' + login);
        const subject: Subject<Usuario[]> = new Subject<Usuario[]>();
        this.http.get('http://localhost:3000/usuario/like/login/' + login).subscribe(response => {
            const lista: Usuario[] = [];
            for (const a of response['dados']) {
                const u = this.converterUser(a);
                lista.push(u);
            }
            console.log('buscarUserLoginLike');
            console.log(lista);
            subject.next(lista);
        });
        return subject.asObservable();

    }



}
