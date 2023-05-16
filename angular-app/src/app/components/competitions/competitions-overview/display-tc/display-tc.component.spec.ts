import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTcComponent } from './display-tc.component';

describe('DisplayTcComponent', () => {
  let component: DisplayTcComponent;
  let fixture: ComponentFixture<DisplayTcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayTcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
