import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaUsuariosComponent } from './pesquisa-usuarios.component';

describe('PesquisaUsuariosComponent', () => {
  let component: PesquisaUsuariosComponent;
  let fixture: ComponentFixture<PesquisaUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
