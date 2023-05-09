import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTestComponent } from './choose-test.component';

describe('ChooseTestComponent', () => {
  let component: ChooseTestComponent;
  let fixture: ComponentFixture<ChooseTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
