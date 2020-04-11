import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypageLeftcardComponent } from './mypage-leftcard.component';

describe('MypageLeftcardComponent', () => {
  let component: MypageLeftcardComponent;
  let fixture: ComponentFixture<MypageLeftcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypageLeftcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypageLeftcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
