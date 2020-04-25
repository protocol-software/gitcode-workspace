import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorEvaluationComponent } from './author-evaluation.component';

describe('AuthorEvaluationComponent', () => {
  let component: AuthorEvaluationComponent;
  let fixture: ComponentFixture<AuthorEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
