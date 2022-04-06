import { Component, OnInit, HostBinding, Inject, Input, TemplateRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { GanttGroupInternal, GanttItemInternal, GanttBarClickEvent, GanttLineClickEvent } from '../../class';
import { GANTT_UPPER_TOKEN, GanttUpper } from '../../gantt-upper';

@Component({
    selector: 'gantt-main',
    templateUrl: './gantt-main.component.html'
})
export class GanttMainComponent implements OnInit {
    public root: Element;

    @Input() groups: GanttGroupInternal[];

    @Input() items: GanttItemInternal[];

    @Input() groupHeaderTemplate: TemplateRef<any>;

    @Input() itemTemplate: TemplateRef<any>;

    @Input() barTemplate: TemplateRef<any>;

    @Input() rangeTemplate: TemplateRef<any>;

    @Output() barClick = new EventEmitter<GanttBarClickEvent>();

    @Output() lineClick = new EventEmitter<GanttLineClickEvent>();

    @HostBinding('class.gantt-main-container') ganttMainClass = true;

    @ViewChild('ganttMainItems') ganttMainItem: ElementRef;

    constructor(@Inject(GANTT_UPPER_TOKEN) public ganttUpper: GanttUpper, private elementRef: ElementRef<HTMLElement>) {}

    ngOnInit() {
        this.getRootDom(this.elementRef);
    }

    trackBy(item: GanttGroupInternal | GanttItemInternal, index: number) {
        return item.id || index;
    }

    scrollCenter(item) {
        // console.log('这是子组件的居中事件');
        this.root.scrollLeft = item.refs.x;
    }

    getRootDom(root: ElementRef<HTMLElement>) {
        this.root = root.nativeElement;
        // console.log('获取gantt-main-container的DOM对象');
    }

    addGanttItemHoverStyle(className) {
        // console.log("这是gantt-main组件的设置class方法");
        this.root.getElementsByClassName(className)[0].classList.add('focus-gantt-item');
    }
    removeGanttItemHoverStyle(className) {
        // console.log("这是gantt-main组件的移除class方法");
        this.root.getElementsByClassName(className)[0].classList.remove('focus-gantt-item');
    }
}
