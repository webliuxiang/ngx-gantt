import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { mockItems, mockGroups } from './mocks';
import { GanttViewType, GanttPrintService, GanttDragEvent, GanttItemType, GanttBarClickEvent } from 'ngx-gantt';

@Component({
    selector: 'app-gantt-flat-example',
    templateUrl: './flat.component.html',
    providers: [GanttPrintService]
})
export class AppGanttFlatExampleComponent implements OnInit, OnDestroy {
    showGantt: Boolean = true;
    timer = undefined
    constructor(
        private printService: GanttPrintService
    ) {}
    

    items = mockItems;

    groups = mockGroups;

    options = {
        viewType: GanttViewType.day,
        type: GanttItemType.flat,
        draggable: true,
        mergeIntervalDays: 3,
        styles: {
            lineHeight: 30
        },
        async: false,
    };

    @HostBinding('class.gantt-demo') class = true;

    ngOnInit(): void {}

    print(name: string) {
        this.printService.print(name);
    }

    // 拖拽结束
    dragEnded(event: GanttDragEvent) {
        
        if (event.targetGroupID) {
            this.items = this.items.map(item => {
                if (item.id === event.item.id) {
                    item.group_id = event.targetGroupID;
                }
                return item;
            })
            
            // TODO:数据交互
            // this.showGantt = false;
            // this.timer = setTimeout(() => {
            //     this.showGantt = true;
            // },200)
        }
    }

    barClick(event: GanttBarClickEvent) {
        console.log(event);
    }
    
    barContextmenuClick(event: GanttBarClickEvent) {
        console.log(1111);
        console.log(event);
    }

    ngOnDestroy(): void {
        this.timer = undefined;
    }
}
