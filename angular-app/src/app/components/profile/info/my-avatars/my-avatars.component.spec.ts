import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAvatarsComponent } from './my-avatars.component';

describe('MyAvatarsComponent', () => {
  let component: MyAvatarsComponent;
  let fixture: ComponentFixture<MyAvatarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAvatarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
