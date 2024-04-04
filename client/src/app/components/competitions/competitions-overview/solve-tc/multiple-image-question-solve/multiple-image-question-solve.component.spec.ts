import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleImageQuestionSolveComponent } from './multiple-image-question-solve.component';

describe('MultipleImageQuestionSolveComponent', () => {
  let component: MultipleImageQuestionSolveComponent;
  let fixture: ComponentFixture<MultipleImageQuestionSolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleImageQuestionSolveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleImageQuestionSolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
