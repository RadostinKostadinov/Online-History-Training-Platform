import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarsCheckComponent } from './avatars-check.component';

describe('AvatarsCheckComponent', () => {
  let component: AvatarsCheckComponent;
  let fixture: ComponentFixture<AvatarsCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarsCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarsCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
