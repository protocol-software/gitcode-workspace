import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeReviewDetailComponent } from './code-review-detail.component';

describe('CodeReviewDetailComponent', () => {
  let component: CodeReviewDetailComponent;
  let fixture: ComponentFixture<CodeReviewDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeReviewDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeReviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
