import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleTcComponent } from './toggle-tc.component';

describe('ToggleTcComponent', () => {
  let component: ToggleTcComponent;
  let fixture: ComponentFixture<ToggleTcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleTcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
