import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCodeReviewComponent } from './public-code-review.component';

describe('PublicCodeReviewComponent', () => {
  let component: PublicCodeReviewComponent;
  let fixture: ComponentFixture<PublicCodeReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicCodeReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicCodeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
