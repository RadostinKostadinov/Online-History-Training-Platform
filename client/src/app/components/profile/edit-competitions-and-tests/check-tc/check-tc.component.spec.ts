import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTcComponent } from './check-tc.component';

describe('CheckTcComponent', () => {
  let component: CheckTcComponent;
  let fixture: ComponentFixture<CheckTcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckTcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
