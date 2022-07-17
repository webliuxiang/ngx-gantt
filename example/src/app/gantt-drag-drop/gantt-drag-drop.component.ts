import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'example-gantt-drag-drop',
    templateUrl: './gantt-drag-drop.component.html',
    styleUrls: ['./gantt-drag-drop.component.scss']
})
export class GanttDragDropComponent implements OnInit {
    constructor() {}
    ngOnInit(): void {}
    
    list = ['11111Get to work', '222222Pick up groceries', '333333Go home',];
    
    list2 = ['444444Fall asleep','555555Get up', '666666Brush teeth',];
    
    list3 = ['777777Take a shower', '888888Check e-mail', '999999Walk dog'];

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
        
    }

}
