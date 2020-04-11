import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPRComponent } from './public-pr.component';

describe('PublicPRComponent', () => {
  let component: PublicPRComponent;
  let fixture: ComponentFixture<PublicPRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicPRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicPRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
