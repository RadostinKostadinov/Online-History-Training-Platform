import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePracticeComponent } from './choose-practice.component';

describe('ChoosePracticeComponent', () => {
  let component: ChoosePracticeComponent;
  let fixture: ComponentFixture<ChoosePracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosePracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
