import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackCodeComponent } from './snack-code.component';

describe('SnackCodeComponent', () => {
  let component: SnackCodeComponent;
  let fixture: ComponentFixture<SnackCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
