import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveTcComponent } from './solve-tc.component';

describe('SolveTcComponent', () => {
  let component: SolveTcComponent;
  let fixture: ComponentFixture<SolveTcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolveTcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
