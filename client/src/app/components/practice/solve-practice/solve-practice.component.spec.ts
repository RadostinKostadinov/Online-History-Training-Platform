import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvePracticeComponent } from './solve-practice.component';

describe('SolvePracticeComponent', () => {
  let component: SolvePracticeComponent;
  let fixture: ComponentFixture<SolvePracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolvePracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolvePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
