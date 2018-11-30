import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaPratoRestauranteComponent } from './pesquisa-prato-restaurante.component';

describe('PesquisaPratoRestauranteComponent', () => {
  let component: PesquisaPratoRestauranteComponent;
  let fixture: ComponentFixture<PesquisaPratoRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaPratoRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaPratoRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
