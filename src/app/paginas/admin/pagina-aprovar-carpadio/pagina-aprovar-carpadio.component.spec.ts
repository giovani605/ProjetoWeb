import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAprovarCarpadioComponent } from './pagina-aprovar-carpadio.component';

describe('PaginaAprovarCarpadioComponent', () => {
  let component: PaginaAprovarCarpadioComponent;
  let fixture: ComponentFixture<PaginaAprovarCarpadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaAprovarCarpadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaAprovarCarpadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
