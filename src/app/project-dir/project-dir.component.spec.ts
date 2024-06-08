import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDirComponent } from './project-dir.component';

describe('ProjectDirComponent', () => {
  let component: ProjectDirComponent;
  let fixture: ComponentFixture<ProjectDirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDirComponent]
    });
    fixture = TestBed.createComponent(ProjectDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
