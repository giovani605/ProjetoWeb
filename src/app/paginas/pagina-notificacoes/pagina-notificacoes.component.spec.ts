import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaNotificacoesComponent } from './pagina-notificacoes.component';

describe('PaginaNotificacoesComponent', () => {
  let component: PaginaNotificacoesComponent;
  let fixture: ComponentFixture<PaginaNotificacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaNotificacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaNotificacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
