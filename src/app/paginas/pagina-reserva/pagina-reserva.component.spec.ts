import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaReservaComponent } from './pagina-reserva.component';

describe('PaginaReservaComponent', () => {
  let component: PaginaReservaComponent;
  let fixture: ComponentFixture<PaginaReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
