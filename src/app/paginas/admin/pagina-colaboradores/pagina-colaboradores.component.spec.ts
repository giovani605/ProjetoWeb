import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaColaboradoresComponent } from './pagina-colaboradores.component';

describe('PaginaColaboradoresComponent', () => {
  let component: PaginaColaboradoresComponent;
  let fixture: ComponentFixture<PaginaColaboradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaColaboradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
