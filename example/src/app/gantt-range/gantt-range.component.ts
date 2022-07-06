import { Component, OnInit, HostBinding } from '@angular/core';
import { mockItems } from './mocks';
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
    GanttPrintService
} from 'ngx-gantt';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Component({
    selector: 'app-gantt-range-example',
    templateUrl: './gantt-range.component.html',
    providers: [GanttPrintService]
})
export class AppGanttRangeExampleComponent implements OnInit {
    items = mockItems;

    titlesList = [
        {
            key: "CreateTime",
            value: ""
        },
        {
            key: "CreateTime",
            value: "2022"
        }
    ];

    options = {
        viewType: GanttViewType.hour,
        draggable: true,
        async: true,
        childrenResolve: this.getChildren.bind(this)
    };

    // viewOptions: GanttViewOptions = {
    //     start: new GanttDate(new Date('2020-3-1')),
    //     end: new GanttDate(new Date('2020-6-30'))
    // };

    @HostBinding('class.gantt-demo') class = true;

    constructor(private printService: GanttPrintService) {}

    ngOnInit(): void {
        // document.oncontextmenu =function () {return false; };
    }

    barClick(event: GanttBarClickEvent) {
        console.log(event);
    }
    oncontextmenuClick(event) {
        console.log(event.pointerType);
        
        console.log(1111);
        console.log(event);
    }
    doubleClick(event: GanttBarClickEvent) {
        console.log('right-Click');
        console.log(event);
    }

    dragEnded(event: GanttDragEvent) {
        this.items = [...this.items];
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
}
