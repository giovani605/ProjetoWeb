import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAmigosComponent } from './pagina-amigos.component';

describe('PaginaAmigosComponent', () => {
  let component: PaginaAmigosComponent;
  let fixture: ComponentFixture<PaginaAmigosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaAmigosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaAmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
