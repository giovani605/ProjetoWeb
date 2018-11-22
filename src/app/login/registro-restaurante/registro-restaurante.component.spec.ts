import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRestauranteComponent } from './registro-restaurante.component';

describe('RegistroRestauranteComponent', () => {
  let component: RegistroRestauranteComponent;
  let fixture: ComponentFixture<RegistroRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
