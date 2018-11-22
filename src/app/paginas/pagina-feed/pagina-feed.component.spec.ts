import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaFeedComponent } from './pagina-feed.component';

describe('PaginaFeedComponent', () => {
  let component: PaginaFeedComponent;
  let fixture: ComponentFixture<PaginaFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
