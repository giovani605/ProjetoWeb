import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPratoComponent } from './registro-prato.component';

describe('RegistroPratoComponent', () => {
  let component: RegistroPratoComponent;
  let fixture: ComponentFixture<RegistroPratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
