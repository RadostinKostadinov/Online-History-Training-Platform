import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleTextQuestionComponent } from './multiple-text-question.component';

describe('MultipleTextQuestionComponent', () => {
  let component: MultipleTextQuestionComponent;
  let fixture: ComponentFixture<MultipleTextQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleTextQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleTextQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
