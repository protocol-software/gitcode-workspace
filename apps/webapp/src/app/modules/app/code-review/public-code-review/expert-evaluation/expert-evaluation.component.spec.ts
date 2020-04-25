import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertEvaluationComponent } from './expert-evaluation.component';

describe('ExpertEvaluationComponent', () => {
  let component: ExpertEvaluationComponent;
  let fixture: ComponentFixture<ExpertEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
