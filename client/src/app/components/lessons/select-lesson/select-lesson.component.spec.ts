import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLessonComponent } from './select-lesson.component';

describe('SelectLessonComponent', () => {
  let component: SelectLessonComponent;
  let fixture: ComponentFixture<SelectLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
