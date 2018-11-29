import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAvaliarComponent } from './pagina-avaliar.component';

describe('PaginaAvaliarComponent', () => {
  let component: PaginaAvaliarComponent;
  let fixture: ComponentFixture<PaginaAvaliarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaAvaliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaAvaliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
