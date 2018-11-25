import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPratoComponent } from './item-prato.component';

describe('ItemPratoComponent', () => {
  let component: ItemPratoComponent;
  let fixture: ComponentFixture<ItemPratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
