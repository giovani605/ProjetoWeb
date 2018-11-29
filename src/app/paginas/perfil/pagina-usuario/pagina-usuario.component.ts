import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pagina-usuario',
  templateUrl: './pagina-usuario.component.html',
  styleUrls: ['./pagina-usuario.component.css']
})
export class PaginaUsuarioComponent implements OnInit {

  public user: Usuario;
  public editavel: boolean;
  public labelOfFirstButton: string;
  public labelOfSecondButton: string;

  constructor( private router: Router, private userService: UserService ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.editavel = false;
    this.labelOfFirstButton = 'Home';
    this.labelOfSecondButton = 'Editar';
  }



  // determinará o que será feito ao apertar o botão da esquerda
  onClickFisrtButton() {
    if (!this.editavel) {
      this.returnToHome();
    } else {
      this.ngOnInit();
    }
  }

  // determinará o que fazer ao apertar o botão a direita
  onClickSecondButton() {
    if (!this.editavel) {
      this.labelOfFirstButton = 'Cancelar';
      this.labelOfSecondButton = 'Salvar';
      this.editavel = true;
    } else {
      alert('Novos dados salvos (coming soon)');
      this.ngOnInit();
    }
  }

  private returnToHome() {
    this.router.navigate(['/home']);
  }
}
