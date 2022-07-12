import {
    Component,
    OnInit,
    HostBinding,
    OnChanges,
    SimpleChanges,
    OnDestroy,
    NgZone,
    Inject,
    ElementRef,
    AfterViewInit,
    ViewChild,
    Output,
    EventEmitter
} from '@angular/core';
import { GanttDatePoint } from '../../class/date-point';
import { Subject, merge } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { headerHeight, todayHeight, todayWidth, todayBorderRadius } from '../../gantt.styles';
import { isNumber } from '../../utils/helpers';
import { GanttDate } from '../../utils/date';
import { GANTT_UPPER_TOKEN, GanttUpper } from '../../gantt-upper';
import { GanttViewType } from './../../class/view-type';
import { CalendarAndGanttComponentService } from 'ngx-gantt/services/calendar-and-gantt-component.service';

const mainHeight = 5000;

@Component({
    selector: 'gantt-calendar-overlay',
    templateUrl: './calendar.component.html'
})
export class GanttCalendarComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

    public root: Element;
    public startMove: number = 0;
    public endMove: number = 0;
    flag: boolean = false;

    get view() {
        return this.ganttUpper.view;
    }

    private unsubscribe$ = new Subject();

    headerHeight = headerHeight;

    mainHeight = mainHeight;

    todayHeight = todayHeight;

    todayWidth = todayWidth;

    todayBorderRadius = todayBorderRadius;

    viewTypes = GanttViewType;

    @HostBinding('class.gantt-calendar-overlay') className = true;

    @ViewChild('dragBox') dragBox: ElementRef;

    constructor(
        @Inject(GANTT_UPPER_TOKEN) public ganttUpper: GanttUpper,
        private ngZone: NgZone,
        private elementRef: ElementRef<HTMLElement>,
        private calendarAndGanttComponentService: CalendarAndGanttComponentService
    ) {}

    setTodayPoint() {
        const x = this.view.getTodayXPoint();
        const today = new GanttDate().getDate();
        const todayEle = this.elementRef.nativeElement.getElementsByClassName('gantt-calendar-today-overlay')[0] as HTMLElement;
        const rect = this.elementRef.nativeElement.getElementsByClassName('today-rect')[0] as HTMLElement;
        const line = this.elementRef.nativeElement.getElementsByClassName('today-line')[0] as HTMLElement;

        if (isNumber(x)) {
            if (rect) {
                rect.style.left = `${x - todayWidth / 2}px`;
                rect.style.top = `${headerHeight - todayHeight}px`;
                rect.innerHTML = today.toString();
            }
            if (line) {
                line.style.left = `${x}px`;
                line.style.top = `${headerHeight}px`;
                line.style.bottom = `${-mainHeight}px`;
            }
        } else {
            todayEle.style.display = 'none';
        }
    }

    ngOnInit() {
        this.getRootDom(this.elementRef);
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            merge(this.ganttUpper.viewChange, this.ganttUpper.view.start$)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(() => {
                    this.setTodayPoint();
                });
        });
    }

    getRootDom(root: ElementRef<HTMLElement>) {
        this.root = root.nativeElement;
    }

    ngAfterViewInit() {}

    ngOnChanges(changes: SimpleChanges): void {}

    trackBy(point: GanttDatePoint, index: number) {
        return point.text || index;
    }

    // mousedown
    mainMouseDown(e) {
        // console.log("mouse move");
        // console.log('start');
    }
    // mouseenter
    mainMouseEnter(e) {
        this.startMove = e.distance.x;
        let boxWidth = this.dragBox.nativeElement.style.width.split("px")[0]*1;
        let clientWidth = this.root.clientWidth;
        let scrollWidth = boxWidth - clientWidth;
        if (e.distance.x > 0 && this.root.scrollLeft === 0) {
            this.flag = true;
        } else if (e.distance.x < 0 && this.root.scrollLeft === scrollWidth) {
            this.flag = true;
        } else {
            this.flag = false;
        }
         
        if (this.flag) return;
        // this.root.scrollLeft -= e.distance.x/15;
        let moveDistance = this.startMove - this.endMove;
        
        this.calendarAndGanttComponentService.setDistance(moveDistance);
        
        this.root.scrollLeft -= moveDistance;
        
        this.endMove = this.startMove;
        
    }
    // mouseup
    mainMouseUp(e) {
        this.resetDragBoxDom(this.elementRef);
        this.flag = false;
        this.startMove = 0;
        this.endMove = 0;
    }

    // 每次移动后都要把 vir-box 元素重置
    resetDragBoxDom(root: ElementRef) {
        root.nativeElement.querySelector('.drag-box').style.transform = "translate3d(0px, 0px, 0px)"
        // console.log('获取gantt-main-container的DOM对象');
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
