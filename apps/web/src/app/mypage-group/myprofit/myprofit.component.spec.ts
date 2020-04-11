import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofitComponent } from './myprofit.component';

describe('MyprofitComponent', () => {
  let component: MyprofitComponent;
  let fixture: ComponentFixture<MyprofitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprofitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprofitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
