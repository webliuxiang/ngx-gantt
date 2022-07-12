import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-gantt-drag-drop',
  templateUrl: './gantt-drag-drop.component.html',
  styleUrls: ['./gantt-drag-drop.component.scss']
})
export class GanttDragDropComponent {

  constructor() { }

  /**
     * 左边类别数据源
     */
   leftSource = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
];

/**
 * 右边列表数据源
 */
rightSource = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
];

/**
 * 拖动的时候，list交换item或者单个list里面item位置的变换
 * @param event
 */
drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
        transferArrayItem(event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex);
    }
}

}
