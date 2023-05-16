import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenQuestionSolveComponent } from './open-question-solve.component';

describe('OpenQuestionSolveComponent', () => {
  let component: OpenQuestionSolveComponent;
  let fixture: ComponentFixture<OpenQuestionSolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenQuestionSolveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenQuestionSolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
