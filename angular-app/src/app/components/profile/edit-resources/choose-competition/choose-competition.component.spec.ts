import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCompetitionComponent } from './choose-competition.component';

describe('ChooseCompetitionComponent', () => {
  let component: ChooseCompetitionComponent;
  let fixture: ComponentFixture<ChooseCompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseCompetitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
