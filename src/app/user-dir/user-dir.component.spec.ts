import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDirComponent } from './user-dir.component';

describe('UserDirComponent', () => {
  let component: UserDirComponent;
  let fixture: ComponentFixture<UserDirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDirComponent]
    });
    fixture = TestBed.createComponent(UserDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
