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
    TemplateRef
} from '@angular/core';
import { startWith, takeUntil, take, finalize } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { GanttUpper, GANTT_UPPER_TOKEN } from './gantt-upper';
import { GanttLinkDragEvent, GanttLineClickEvent, GanttItemInternal, GanttItem, GanttGroupInternal, GanttGroup } from './class';
import { NgxGanttTableColumnComponent } from './table/gantt-column.component';
import { sideWidth } from './gantt.styles';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { NgxGanttTableComponent } from './table/gantt-table.component';

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

    private ngUnsubscribe$ = new Subject();

    public sideTableWidth = sideWidth;

    constructor(elementRef: ElementRef<HTMLElement>, cdr: ChangeDetectorRef, ngZone: NgZone) {
        super(elementRef, cdr, ngZone);
    }

    ngOnInit() {
        super.onInit();

        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.dragContainer.linkDragStarted.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((event: GanttLinkDragEvent) => {
                this.linkDragStarted.emit(event);
            });
            this.dragContainer.linkDragEnded.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((event: GanttLinkDragEvent) => {
                this.linkDragEnded.emit(event);
            });
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

    colHover(item) {
        // console.log("这是父组件的hover事件");
        if (item.type) {
            this.ganttMain.addGanttItemHoverStyle(item.item.id)
        } else {
            this.ganttMain.removeGanttItemHoverStyle(item.item.id)
        }
    }

    ngOnDestroy() {
        super.onDestroy();
    }
}
