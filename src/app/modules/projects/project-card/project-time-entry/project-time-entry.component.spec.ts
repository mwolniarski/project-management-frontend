import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTimeEntryComponent } from './project-time-entry.component';

describe('ProjectTimeEntryComponent', () => {
  let component: ProjectTimeEntryComponent;
  let fixture: ComponentFixture<ProjectTimeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTimeEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTimeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
