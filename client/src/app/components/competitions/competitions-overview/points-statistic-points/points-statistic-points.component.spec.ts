import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsStatisticPointsComponent } from './points-statistic-points.component';

describe('PointsStatisticPointsComponent', () => {
  let component: PointsStatisticPointsComponent;
  let fixture: ComponentFixture<PointsStatisticPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsStatisticPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsStatisticPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
