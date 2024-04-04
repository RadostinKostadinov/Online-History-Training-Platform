import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTcChooseStudentComponent } from './check-tc-choose-student.component';

describe('CheckTcChooseStudentComponent', () => {
  let component: CheckTcChooseStudentComponent;
  let fixture: ComponentFixture<CheckTcChooseStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckTcChooseStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTcChooseStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
