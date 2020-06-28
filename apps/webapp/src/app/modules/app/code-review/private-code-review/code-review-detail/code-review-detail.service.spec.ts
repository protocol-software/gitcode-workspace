import { TestBed } from '@angular/core/testing';

import { CodeReviewDetailService } from './code-review-detail.service';

describe('CodeReviewDetailService', () => {
  let service: CodeReviewDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeReviewDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
