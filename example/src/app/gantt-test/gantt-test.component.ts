import { GanttPrintService } from './../../../../packages/gantt/src/gantt-print.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { mockItems, mockGroups, mockSubItems} from './mocks';
import {
    GanttBarClickEvent,
    GanttViewType,
    GanttDragEvent,
    GanttLoadOnScrollEvent,
    GanttLineClickEvent,
    GanttLinkDragEvent,
    GanttItem,
    GanttViewOptions,
    GanttDate,
    GanttTableEvent
} from 'ngx-gantt';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'example-gantt-test',
  templateUrl: './gantt-test.component.html',
  providers: [GanttPrintService]
})
export class GanttTestComponent implements OnInit {
  constructor(private printService: GanttPrintService) {}

  items = mockItems;

  groups = mockGroups;

  subitems = mockSubItems;

  options = {
      viewType: GanttViewType.week,
      draggable: false,
      linkable: false,
      async: false,
      childrenResolve: this.getChildren.bind(this)
  };

  viewOptions: GanttViewOptions = {
      start: new GanttDate(new Date('2020-3-1')),
      end: new GanttDate(new Date('2020-6-30'))
  };

  @HostBinding('class.gantt-demo') class = true;

  ngOnInit(): void {}

  barClick(event: GanttBarClickEvent) {
      console.log(event);
  }

  lineClick(event: GanttLineClickEvent) {
      console.log(event);
  }

  dragEnded(event: GanttDragEvent) {
      this.items = [...this.items];
      this.groups = [...this.groups];
      this.subitems = [...this.subitems];
  }

  loadOnScroll(event: GanttLoadOnScrollEvent) {}

  getChildren(item: GanttItem) {
      return of([
          {
              id: new Date().getTime(),
              title: new Date().getTime(),
              start: Math.floor(new Date().getTime() / 1000),
              draggable: true,
              linkable: false
          }
      ]).pipe(delay(1000));
  }

  print(name: string) {
      this.printService.print(name);
  }

  columnChanges(event: GanttTableEvent) {
      console.log(event);
  }
}