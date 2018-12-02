import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { Usuario } from '../model/usuario.model';
import { CanActivate, Router } from '@angular/router';
import { Notificacao } from '../model/notificacao.model';


@Injectable({ providedIn: 'root' })
export class UserService implements CanActivate {
    public user: Usuario = new Usuario();
    private isAuth = false;
    private listaAmigos: Usuario[] = [];
    private subsAmigos: Subject<Usuario[]> = new Subject<Usuario[]>();


    getListenerListaAmigos() {
        return this.subsAmigos.asObservable();
    }

    getListaAmigos() {
        return this.listaAmigos;
    }
    carregarAmigos() {
        var subs: Subscription = this.procurarAmigos(this.getUserId()).subscribe(dados => {
            this.listaAmigos = dados;
            subs.unsubscribe();
        });
    }


    canActivate() {
        if (!this.isAuth) {
            this.router.navigate(['login']);
            return false;
        }
        return this.isAuth;
    }
    procurarAmigos(userId) {
        console.log("pesquisar amigos");
        this.http.get('http://localhost:3000/usuario/amigos/' + userId).subscribe(response => {
            var lista: Usuario[] = [];
            for (var a of response['dados']) {
                var u = this.converterUser(a);
                lista.push(u);
            }
            console.log('procurarAmigos');
            console.log(lista);
            this.subsAmigos.next(lista);
        });
        return this.subsAmigos;
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
        var user = new Usuario();
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
        var subject: Subject<Usuario[]> = new Subject<Usuario[]>();
        this.http.get('http://localhost:3000/usuario/like/login/' + login).subscribe(response => {
            var lista: Usuario[] = [];
            for (var a of response['dados']) {
                var u = this.converterUser(a);
                lista.push(u);
            }
            console.log('buscarUserLoginLike');
            console.log(lista);
            subject.next(lista);
        });
        return subject.asObservable();

    }

    inserirAmigos(idUser1, idUser2) {
        var dados = {
            "userid1": idUser1,
            "userid2": idUser2
        }
        console.log('inserirAmigos ' + idUser1 + " " + idUser2);
        var subject: Subject<any> = new Subject<any>();
        this.http.post('http://localhost:3000/usuario/adicionar/amigos', dados).subscribe(response => {
            subject.next(response);
        });
        return subject.asObservable();
    }
    enviarNotificacao(note: Notificacao) {
        var subject: Subject<any> = new Subject<any>();
        this.http.post('http://localhost:3000/usuario/inserir/notificacao', { "dados": note }).subscribe(response => {
            subject.next(response);
        });
        return subject.asObservable();
    }

    converterNotificacao(dados):Notificacao{
        var n: Notificacao = new Notificacao();
        n.ativo = dados['ativo'];
        n.idusuario = dados['idusuario'];
        n.descricao = dados['descricao'];
        n.idnotificacao = dados['idnotificacao'];
        n.link = dados['link'];
        n.idremetente = dados['idremetente'];
        return n;

    }

    buscarNotificacoesUserId(userId){
        console.log('buscarNotificacoesUserId ' + userId);
        var subject: Subject<Notificacao[]> = new Subject<Notificacao[]>();
        this.http.get('http://localhost:3000/usuario/buscar/notificao/by-iduser/' + userId).subscribe(response => {
            var lista: Notificacao[] = [];
            for (var a of response['dados']) {
                var u = this.converterNotificacao(a);
                lista.push(u);
            }
            console.log('buscarNotificacoesUserId resultado');
            console.log(lista);
            subject.next(lista);
        });
        return subject.asObservable();
    }

}
