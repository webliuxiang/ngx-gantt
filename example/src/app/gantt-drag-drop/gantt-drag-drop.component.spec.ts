import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttDragDropComponent } from './gantt-drag-drop.component';

describe('GanttDragDropComponent', () => {
  let component: GanttDragDropComponent;
  let fixture: ComponentFixture<GanttDragDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GanttDragDropComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
