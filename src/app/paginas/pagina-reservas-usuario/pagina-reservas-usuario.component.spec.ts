import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaReservasUsuarioComponent } from './pagina-reservas-usuario.component';

describe('PaginaReservasUsuarioComponent', () => {
  let component: PaginaReservasUsuarioComponent;
  let fixture: ComponentFixture<PaginaReservasUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaReservasUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaReservasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
