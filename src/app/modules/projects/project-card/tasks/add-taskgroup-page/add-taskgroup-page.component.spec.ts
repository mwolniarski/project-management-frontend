import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskgroupPageComponent } from './add-taskgroup-page.component';

describe('AddTaskgroupPageComponent', () => {
  let component: AddTaskgroupPageComponent;
  let fixture: ComponentFixture<AddTaskgroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskgroupPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskgroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
