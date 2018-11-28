import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-usuario',
  templateUrl: './pagina-usuario.component.html',
  styleUrls: ['./pagina-usuario.component.css']
})
export class PaginaUsuarioComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  returnToHome() {
    this.router.navigate(['/home']);
  }
}
