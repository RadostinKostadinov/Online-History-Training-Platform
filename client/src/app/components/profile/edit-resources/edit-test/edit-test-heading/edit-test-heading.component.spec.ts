import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestHeadingComponent } from './edit-test-heading.component';

describe('EditTestHeadingComponent', () => {
  let component: EditTestHeadingComponent;
  let fixture: ComponentFixture<EditTestHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTestHeadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
