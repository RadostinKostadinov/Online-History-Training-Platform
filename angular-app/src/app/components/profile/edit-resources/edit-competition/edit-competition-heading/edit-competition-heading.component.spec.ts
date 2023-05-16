import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompetitionHeadingComponent } from './edit-competition-heading.component';

describe('EditCompetitionHeadingComponent', () => {
  let component: EditCompetitionHeadingComponent;
  let fixture: ComponentFixture<EditCompetitionHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompetitionHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompetitionHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
