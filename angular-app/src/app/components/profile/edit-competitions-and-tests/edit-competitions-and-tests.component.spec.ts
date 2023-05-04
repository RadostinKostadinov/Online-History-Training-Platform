import { ComponentFixture, TestBed } from '@angular/core/testing';

import {EditCompetitionsAndTests } from './edit-competitions-and-tests.component';

describe('EditCompetitionsAndTests', () => {
  let component: EditCompetitionsAndTests;
  let fixture: ComponentFixture<EditCompetitionsAndTests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompetitionsAndTests ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompetitionsAndTests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
