import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { AuthData } from 'src/app/model/authData.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authData: AuthData = new AuthData();

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log("chamando o servico");
    this.authService.login(this.authData)
  }
}
