import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPeriodoPratoComponent } from './registro-periodo-prato.component';

describe('RegistroPeriodoPratoComponent', () => {
  let component: RegistroPeriodoPratoComponent;
  let fixture: ComponentFixture<RegistroPeriodoPratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPeriodoPratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPeriodoPratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
