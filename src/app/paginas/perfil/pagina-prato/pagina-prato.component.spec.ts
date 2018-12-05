import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPratoComponent } from './pagina-prato.component';

describe('PaginaPratoComponent', () => {
  let component: PaginaPratoComponent;
  let fixture: ComponentFixture<PaginaPratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaPratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
