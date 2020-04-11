import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageGroupComponent } from './mypage-group.component';

describe('MypageGroupComponent', () => {
  let component: MypageGroupComponent;
  let fixture: ComponentFixture<MypageGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
