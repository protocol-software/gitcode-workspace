import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePrComponent } from './private-pr.component';

describe('PrivatePrComponent', () => {
  let component: PrivatePrComponent;
  let fixture: ComponentFixture<PrivatePrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatePrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
