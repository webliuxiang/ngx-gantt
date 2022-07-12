import {
    Component,
    OnInit,
    ElementRef,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
    ChangeDetectorRef,
    NgZone,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ContentChildren,
    QueryList,
    AfterViewInit,
    ViewChild,
    ContentChild,
    TemplateRef,
    HostListener
} from '@angular/core';
import { startWith, takeUntil, take, finalize } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { GanttUpper, GANTT_UPPER_TOKEN } from './gantt-upper';
import { GanttLinkDragEvent, GanttLineClickEvent, GanttItemInternal, GanttItem, GanttGroupInternal, GanttGroup } from './class';
import { NgxGanttTableColumnComponent } from './table/gantt-column.component';
import { sideWidth } from './gantt.styles';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { NgxGanttTableComponent } from './table/gantt-table.component';
import { CalendarAndGanttComponentService } from './services/calendar-and-gantt-component.service';
import { GanttItemDragDropService } from './services/gantt-item-drag-drop.service';

export const defaultColumnWidth = 100;
export const minColumnWidth = 20;

@Component({
    selector: 'ngx-gantt',
    templateUrl: './gantt.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: GANTT_UPPER_TOKEN,
            useExisting: NgxGanttComponent
        }
    ]
})
export class NgxGanttComponent extends GanttUpper implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    public root: Element;

    @Input() maxLevel = 2;

    @Input() async: boolean;

    @Input() childrenResolve: (GanttItem) => Observable<GanttItem[]>;

    @Input() linkable: boolean;
    /**
     * 显示类型:
     * all:实际和计划同时展示
     * plan:只展示计划
     * actual:只展示实际
     */
    @Input() visibleType: string = 'plan';

    @Output() linkDragStarted = new EventEmitter<GanttLinkDragEvent>();

    @Output() linkDragEnded = new EventEmitter<GanttLinkDragEvent>();

    @Output() lineClick = new EventEmitter<GanttLineClickEvent>();

    @ContentChild(NgxGanttTableComponent) table: NgxGanttTableComponent;

    @ContentChildren(NgxGanttTableColumnComponent, { descendants: true }) columns: QueryList<NgxGanttTableColumnComponent>;

    @ContentChild('tableEmpty', { static: true }) tableEmptyTemplate: TemplateRef<any>;

    @ViewChild('ganttMain') ganttMain;

    @ViewChild('virtualBox') virtualBox: ElementRef;

    private ngUnsubscribe$ = new Subject();

    public sideTableWidth = sideWidth;

    public virtualDom: Element;
    public startMove: number = 0;
    public endMove: number = 0;
    public flag: boolean = false;
    dragStatusSub: any;
    dragStatus: boolean;

    // 鼠标滚动
    @HostListener('mousewheel', ['$event'])
    scroll(event: MouseEvent) {
        // TODO:监听鼠标滚动事件
        // console.log('Entered mouse wheel');
        // console.log("clientY---" + event.clientY);
        // console.log("movementY---" + event.movementY);
        // console.log("offsetY---" + event.offsetY);
        // console.log("pageY---" + event.pageY);
        // console.log("screenY---" + event.screenY);
        // console.log("y---" + event.y);

        console.log(this.ganttMain);
        console.log(this.virtualBox);
        
    }

    constructor(
        elementRef: ElementRef<HTMLElement>,
        cdr: ChangeDetectorRef,
        ngZone: NgZone,
        private calendarAndGanttComponentService: CalendarAndGanttComponentService,
        private ganttItemDragDropService: GanttItemDragDropService
    ) {
        super(elementRef, cdr, ngZone);
    }

    ngOnInit() {
        super.onInit();
        this.getRootDom(this.elementRef);

        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.dragContainer.linkDragStarted.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((event: GanttLinkDragEvent) => {
                this.linkDragStarted.emit(event);
            });
            this.dragContainer.linkDragEnded.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((event: GanttLinkDragEvent) => {
                this.linkDragEnded.emit(event);
            });
        });

        // 订阅 dragStatus$
        this.dragStatusSub = this.ganttItemDragDropService.dragStatus$.subscribe((value) => {
            this.dragStatus = value;
            this.setTaskDropBoxStyle(this.elementRef,this.dragStatus);
        });
    }

    ngAfterViewInit() {
        this.columns.changes.pipe(startWith(true), takeUntil(this.ngUnsubscribe$)).subscribe(() => {
            this.columns.forEach((column) => {
                if (!column.columnWidth) {
                    column.columnWidth = coerceCssPixelValue(defaultColumnWidth);
                }
            });
            this.cdr.detectChanges();
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        super.onChanges(changes);
    }

    expandChildren(item: GanttItemInternal) {
        if (!item.expanded) {
            item.setExpand(true);
            if (this.async && this.childrenResolve && item.children.length === 0) {
                item.loading = true;
                this.childrenResolve(item.origin)
                    .pipe(
                        take(1),
                        finalize(() => {
                            item.loading = false;
                            this.expandChange.emit();
                            this.cdr.detectChanges();
                        })
                    )
                    .subscribe((items) => {
                        item.addChildren(items);
                        this.computeItemsRefs(...item.children);
                    });
            } else {
                this.computeItemsRefs(...item.children);
                this.expandChange.emit();
            }
        } else {
            item.setExpand(false);
            this.expandChange.emit();
        }
    }

    colClick(item) {
        // console.log("这是父组件的点击事件");
        this.ganttMain.scrollCenter(item);
    }

    // // mousedown
    // mainMouseDown(e) {
    //     this.ganttMain.mainMouseDown(e);
    // }
    // // mouseenter
    // mainMouseEnter(e) {
    //     this.ganttMain.mainMouseEnter(e);
    // }
    // // mouseup
    // mainMouseUp(e) {
    //     this.ganttMain.mainMouseUp(e);
    // }
    getRootDom(root: ElementRef<HTMLElement>) {
        this.root = root.nativeElement;
        // console.log('获取gantt-main-container的DOM对象');
    }
    // mousedown
    mainMouseDown(e) {
        // console.log("mouse move");
        // let root: ElementRef = this.elementRef;
        // root.nativeElement.querySelector('.vir-box').style.zIndex = "999"
        // console.log('start');
    }
    // mouseenter
    mainMouseEnter(e) {
        this.startMove = e.distance.x;
        let boxWidth = this.virtualBox.nativeElement.style.width.split('px')[0] * 1;
        let clientWidth = this.ganttMain.root.clientWidth;
        let scrollWidth = boxWidth - clientWidth;
        if (e.distance.x > 0 && this.ganttMain.root.scrollLeft === 0) {
            this.flag = true;
        } else if (e.distance.x < 0 && this.ganttMain.root.scrollLeft === scrollWidth) {
            this.flag = true;
        } else {
            this.flag = false;
        }

        if (this.flag) return;
        // this.root.scrollLeft -= e.distance.x/15;
        let moveDistance = this.startMove - this.endMove;

        this.calendarAndGanttComponentService.setDistance(moveDistance);

        // this.root.scrollLeft -= moveDistance;

        this.endMove = this.startMove;
    }
    // mouseup
    mainMouseUp(e) {
        this.resetVirBoxDom(this.elementRef);
        this.flag = false;
        this.startMove = 0;
        this.endMove = 0;
    }

    // 每次移动后都要把 vir-box 元素重置
    resetVirBoxDom(root: ElementRef) {
        root.nativeElement.querySelector('.vir-box').style.transform = 'translate3d(0px, 0px, 0px)';
        // console.log('获取gantt-main-container的DOM对象');
    }

    setTaskDropBoxStyle(element: ElementRef,status: boolean) {
        console.log(element.nativeElement.querySelector('.task-drop-box'));
        if (status) {
            element.nativeElement.querySelector('.task-drop-box').style.background = '#a3909070';
            element.nativeElement.querySelector('.task-drop-box').style.zIndex = '2';
        } else {
            if (element.nativeElement.querySelector('.task-drop-box')) {
                element.nativeElement.querySelector('.task-drop-box').style.background = '#a3909000';
                element.nativeElement.querySelector('.task-drop-box').style.zIndex = '0';
            }
        }
        // console.log('获取task-drop-box的DOM对象');
    }

    colHover(item) {
        // console.log("这是父组件的hover事件");
        if (item.type) {
            this.ganttMain.addGanttItemHoverStyle(item.item.id);
        } else {
            this.ganttMain.removeGanttItemHoverStyle(item.item.id);
        }
    }

    ngOnDestroy() {
        super.onDestroy();
    }
}
