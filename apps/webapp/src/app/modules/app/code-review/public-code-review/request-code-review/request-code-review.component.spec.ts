import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCodeReviewComponent } from './request-code-review.component';

describe('RequestCodeReviewComponent', () => {
  let component: RequestCodeReviewComponent;
  let fixture: ComponentFixture<RequestCodeReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestCodeReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCodeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
