import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleTextQuestionSolveComponent } from './multiple-text-question-solve.component';

describe('MultipleTextQuestionSolveComponent', () => {
  let component: MultipleTextQuestionSolveComponent;
  let fixture: ComponentFixture<MultipleTextQuestionSolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleTextQuestionSolveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleTextQuestionSolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
