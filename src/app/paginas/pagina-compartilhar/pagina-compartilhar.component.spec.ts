import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCompartilharComponent } from './pagina-compartilhar.component';

describe('PaginaCompartilharComponent', () => {
  let component: PaginaCompartilharComponent;
  let fixture: ComponentFixture<PaginaCompartilharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaCompartilharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCompartilharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
