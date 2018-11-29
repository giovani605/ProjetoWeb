import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaReservasRestauranteComponent } from './pagina-reservas-restaurante.component';

describe('PaginaReservasRestauranteComponent', () => {
  let component: PaginaReservasRestauranteComponent;
  let fixture: ComponentFixture<PaginaReservasRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaReservasRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaReservasRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
