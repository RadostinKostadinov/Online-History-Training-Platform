import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEraComponent } from './select-era.component';

describe('SelectEraComponent', () => {
  let component: SelectEraComponent;
  let fixture: ComponentFixture<SelectEraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectEraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
