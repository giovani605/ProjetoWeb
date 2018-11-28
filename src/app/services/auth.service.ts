import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../model/authData.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from '../model/usuario.model';
import { RestauranteService } from './restaurante.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient, private router: Router, public userService: UserService,
    private restauranteService: RestauranteService) {

    }

    login(data: AuthData) {
        this.http.post('http://localhost:3000/auth/login', data).subscribe(response => {
            console.log(response);
            // sucesso
            if (response['loginFlag'] === true) {
                const user = this.userService.converterUserBackdados(response['user']);
                this.restauranteService.carregarRestaurante(user.idUsuario);
                console.log(user);
                this.userService.logar(user);
                this.router.navigate(['/home']);
            }
        });
    }
}
