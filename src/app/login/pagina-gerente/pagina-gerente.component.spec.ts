import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaGerenteComponent } from './pagina-gerente.component';

describe('PaginaGerenteComponent', () => {
  let component: PaginaGerenteComponent;
  let fixture: ComponentFixture<PaginaGerenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaGerenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
