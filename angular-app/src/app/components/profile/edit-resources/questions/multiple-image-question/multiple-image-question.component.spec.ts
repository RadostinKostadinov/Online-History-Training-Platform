import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleImageQuestionComponent } from './multiple-image-question.component';

describe('MultipleImageQuestionComponent', () => {
  let component: MultipleImageQuestionComponent;
  let fixture: ComponentFixture<MultipleImageQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleImageQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleImageQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
