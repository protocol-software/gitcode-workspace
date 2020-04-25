import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCodeReviewComponent } from './private-code-review.component';

describe('PrivateCodeReviewComponent', () => {
  let component: PrivateCodeReviewComponent;
  let fixture: ComponentFixture<PrivateCodeReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateCodeReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCodeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
