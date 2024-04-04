import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionsOverviewComponent } from './competitions-overview.component';

describe('CompetitionsOverviewComponent', () => {
  let component: CompetitionsOverviewComponent;
  let fixture: ComponentFixture<CompetitionsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
