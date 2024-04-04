import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTcSolutionComponent } from './view-tc-solution.component';

describe('ViewTcSolutionComponent', () => {
  let component: ViewTcSolutionComponent;
  let fixture: ComponentFixture<ViewTcSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTcSolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTcSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
