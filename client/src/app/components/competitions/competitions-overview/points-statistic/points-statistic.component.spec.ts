import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsStatisticComponent } from './points-statistic.component';

describe('PointsStatisticComponent', () => {
  let component: PointsStatisticComponent;
  let fixture: ComponentFixture<PointsStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsStatisticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
