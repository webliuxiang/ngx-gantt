import {
    Component,
    OnInit,
    Input,
    TemplateRef,
    HostBinding,
    ElementRef,
    OnChanges,
    OnDestroy,
    Inject,
    ViewChild,
    Output,
    EventEmitter,
    AfterViewInit
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { GanttBarActualDrag } from './bar-drag-actual';
import { hexToRgb } from '../../utils/helpers';
import { GanttDragContainer } from '../../gantt-drag-container';
import { barBackground } from '../../gantt.styles';
import { GanttBarClickEvent } from '../../class';
import { GANTT_UPPER_TOKEN, GanttUpper } from '../../gantt-upper';
import { GanttItemActualUpper } from '../../gantt-item-actual-upper';

function linearGradient(sideOrCorner: string, color: string, stop: string) {
    return `linear-gradient(${sideOrCorner},${color} 0%,${stop} 40%)`;
}

@Component({
    selector: 'ngx-gantt-bar-actual,gantt-bar-actual',
    templateUrl: './bar-actual.component.html',
    providers: [GanttBarActualDrag]
})
export class NgxGanttBarActualComponent extends GanttItemActualUpper implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Output() barClick = new EventEmitter<GanttBarClickEvent>();
    @Output() barContextmenuClick = new EventEmitter<GanttBarClickEvent>();
    @Output() barDoubleClick = new EventEmitter<GanttBarClickEvent>();

    @ViewChild('content') contentElementRef: ElementRef<HTMLDivElement>;

    @HostBinding('class.gantt-bar') ganttItemClass = true;

    color = 'red';

    constructor(
        private dragContainer: GanttDragContainer,
        private drag: GanttBarActualDrag,
        elementRef: ElementRef<HTMLDivElement>,
        @Inject(GANTT_UPPER_TOKEN) public ganttUpper: GanttUpper
    ) {
        super(elementRef, ganttUpper);
    }

    ngOnInit() {
        super.onInit();
        this.dragContainer.dragEnded.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.setContentBackground();
        });
        // document.oncontextmenu =function () {return false; };
    }

    ngAfterViewInit() {
        this.drag.createDrags(this.elementRef, this.item, this.ganttUpper);
        this.setContentBackground();
    }

    ngOnChanges(): void {
        super.onChanges();
    }
    // 点击事件
    onBarClick(event: Event) {
        event.stopPropagation();
        this.barClick.emit({ event, item: this.item.origin });
    }
    // 双击事件
    onBarDoubleClick(event: Event) {
        event.stopPropagation();
        this.barDoubleClick.emit({ event, item: this.item.origin });
    }
    // 右键事件
    onBarContextmenuClick(event: Event) {
        event.stopPropagation();
        event.preventDefault();
        
        this.barContextmenuClick.emit({ event, item: this.item.origin,barType: 'actual' });
    }

    private setContentBackground() {
        const contentElement = this.contentElementRef.nativeElement;
        const color = this.item.ac_color || barBackground;
        const style: Partial<CSSStyleDeclaration> = this.item.barStyle || {};
        if (this.item.origin.ac_start && this.item.origin.ac_end) {
            style.background = color;
            style.borderRadius = '';
        }
        if (this.item.origin.ac_start && !this.item.origin.ac_end) {
            style.background = linearGradient('to left', hexToRgb(color, 0.55), hexToRgb(color, 1));
            style.borderRadius = '4px 12.5px 12.5px 4px';
        }
        if (!this.item.origin.ac_start && this.item.origin.ac_end) {
            style.background = linearGradient('to right', hexToRgb(color, 0.55), hexToRgb(color, 1));
            style.borderRadius = '12.5px 4px 4px 12.5px';
        }
        if (this.item.ac_progress >= 0) {
            const contentProgressElement = contentElement.querySelector('.gantt-bar-content-progress') as HTMLDivElement;
            style.background = hexToRgb(color, 0.3);
            style.borderRadius = '';
            contentProgressElement.style.background = color;
        }

        for (const key in style) {
            if (style.hasOwnProperty(key)) {
                contentElement.style[key] = style[key];
            }
        }
    }

    stopPropagation(event: Event) {
        event.stopPropagation();
    }

    ngOnDestroy() {
        super.onDestroy();
    }
}
