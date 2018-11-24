import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "../model/authData.model";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { Usuario } from "../model/usuario.model";

@Injectable({ providedIn: "root" })
export class AuthService {

    constructor(private http: HttpClient, private router: Router, public userService: UserService) {

    }

    login(data: AuthData) {
        this.http.post("http://localhost:3000/auth/login", data).subscribe(response => {
            console.log(response);
            // sucesso
            if (response["loginFlag"] == true) {
                var user = new Usuario();
                user.login = response["user"]["login"];
                user.idUsuario = response["user"]["idUsuario"];
                user.nome = response["user"]["nome"];
                user.senha = response["user"]["senha"];
                user.cidades_id = response["user"]["cidades_id"];
                this.userService.setUserClone(user);
                this.router.navigate(["/home"]);
            }



        });
    }
}