import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaRestauranteComponent } from './pagina-restaurante.component';

describe('PaginaRestauranteComponent', () => {
  let component: PaginaRestauranteComponent;
  let fixture: ComponentFixture<PaginaRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
