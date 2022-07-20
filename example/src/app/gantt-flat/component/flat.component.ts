import {
    Component,
    OnInit,
    HostBinding,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    NgZone,
    ChangeDetectorRef,
    ElementRef,
    ViewChild,
    Output,
    EventEmitter
} from '@angular/core';
import { GANTT_UPPER_TOKEN, GanttUpper, GanttItemInternal, GanttGroupInternal, GanttBarClickEvent } from 'ngx-gantt';
import { startWith, takeUntil } from 'rxjs/operators';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-gantt-flat',
    templateUrl: './flat.component.html',
    styleUrls: ['./flat.component.scss'],
    providers: [
        {
            provide: GANTT_UPPER_TOKEN,
            useExisting: AppGanttFlatComponent
        }
    ]
})
export class AppGanttFlatComponent extends GanttUpper implements OnInit, OnChanges, OnDestroy {
    public root: Element;
    mergeIntervalDays = 3;

    groups: GanttGroupInternal[] = [];

    @HostBinding('class.gantt-flat') ganttFlatClass = true;

    @ViewChild('dragBox') dragBox;
    @ViewChild('ganttMainContainer') ganttMainContainer;
    startMove: any;
    flag: boolean;
    endMove: any;

    constructor(elementRef: ElementRef<HTMLElement>, cdr: ChangeDetectorRef, ngZone: NgZone) {
        super(elementRef, cdr, ngZone);
    }

    ngOnInit() {
        super.onInit();
        this.getRootDom(this.elementRef);
        this.dragEnded.pipe(startWith(null), takeUntil(this.unsubscribe$)).subscribe(() => {
            this.buildGroupItems();
        });
        // console.log(this.groups);
        // console.log(this.view);
    }

    private buildGroupItems() {
        this.groups.forEach((group) => {
            group.mergedItems = this.buildGroupMergedItems(group.items);
            // 如果没有数据，默认填充两行空行
            group.mergedItems = group.mergedItems.length === 0 ? [[]] : group.mergedItems;
        });
    }

    private buildGroupMergedItems(items: GanttItemInternal[]) {
        const mergedItems: GanttItemInternal[][] = [];
        items = items.filter((item) => item.start && item.end).sort((a, b) => a.start.getUnixTime() - b.start.getUnixTime());
        items.forEach((item) => {
            let indexOfMergedItems = -1;
            for (let i = 0; i < mergedItems.length; i++) {
                const subItems = mergedItems[i];
                if (item.start.value > subItems[subItems.length - 1].end.addDays(this.mergeIntervalDays).value) {
                    subItems.push(item);
                    indexOfMergedItems = i;
                    break;
                }
            }
            // 如果没有合适的位置插入，则插入到最后一行
            if (indexOfMergedItems === -1) {
                mergedItems.push([item]);
                indexOfMergedItems = mergedItems.length - 1;
            }
        });
        return mergedItems;
    }

    ngOnChanges(changes: SimpleChanges) {
        super.onChanges(changes);
        // 监听数据变化重新绘制甘特图
        this.buildGroupItems();
    }

    getRootDom(root: ElementRef<HTMLElement>) {
        this.root = root.nativeElement;
        // console.log('获取gantt-main-container的DOM对象');
    }
    // 每次移动后都要把 drag-box 元素重置
    resetVirBoxDom(root: ElementRef) {
        root.nativeElement.querySelector('.drag-box').style.transform = 'translate3d(0px, 0px, 0px)';
        // console.log('获取gantt-main-container的DOM对象');
    }

    // mousedown
    mainMouseDown(e) {
        // console.log('start');
    }
    // mouseenter
    mainMouseEnter(e) {
        this.startMove = e.distance.x;
        let boxWidth = this.dragBox.nativeElement.style.width.split('px')[0] * 1;
        let clientWidth = this.ganttMainContainer.nativeElement.clientWidth;
        let scrollWidth = boxWidth - clientWidth;
        // console.log("e.distance.x ---> " + e.distance.x);
        // console.log("this.startMove ---> " + this.startMove);
        // console.log("this.endMove ---> " + this.endMove);
        // console.log("this.ganttMainContainer.nativeElement.scrollLeft ---> " + this.ganttMainContainer.nativeElement.scrollLeft);
        // console.log("boxWidth ---> " + boxWidth);
        // console.log("clientWidth ---> " + clientWidth);
        // console.log("scrollWidth ---> " + scrollWidth);
        // console.log("===============");

        if (boxWidth < clientWidth) return;

        if (e.distance.x > 0 && this.ganttMainContainer.nativeElement.scrollLeft === 0) {
            this.flag = true;
        } else if (e.distance.x < 0 && this.ganttMainContainer.nativeElement.scrollLeft === scrollWidth) {
            this.flag = true;
        } else {
            this.flag = false;
        }

        if (this.flag) return;
        // this.ganttMainContainer.nativeElement.scrollLeft -= e.distance.x/15;
        let moveDistance = this.startMove - this.endMove;
        // console.log(moveDistance);

        this.ganttMainContainer.nativeElement.scrollLeft -= moveDistance;

        this.endMove = this.startMove;
    }
    // mouseup
    mainMouseUp(e) {
        console.log(111);

        this.resetVirBoxDom(this.elementRef);
        this.flag = false;
        this.startMove = 0;
        this.endMove = 0;
    }

    ngOnDestroy() {
        super.onDestroy();
    }
}
