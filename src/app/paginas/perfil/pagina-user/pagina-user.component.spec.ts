import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaUserComponent } from './pagina-user.component';

describe('PaginaUserComponent', () => {
  let component: PaginaUserComponent;
  let fixture: ComponentFixture<PaginaUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
