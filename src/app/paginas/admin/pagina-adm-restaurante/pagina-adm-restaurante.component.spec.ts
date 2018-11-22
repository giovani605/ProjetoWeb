import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAdmRestauranteComponent } from './pagina-adm-restaurante.component';

describe('PaginaAdmRestauranteComponent', () => {
  let component: PaginaAdmRestauranteComponent;
  let fixture: ComponentFixture<PaginaAdmRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaAdmRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaAdmRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
