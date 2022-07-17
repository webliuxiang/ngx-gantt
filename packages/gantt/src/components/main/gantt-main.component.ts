import { Component, OnInit, HostBinding, Inject, Input, TemplateRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { GanttGroupInternal, GanttItemInternal, GanttBarClickEvent, GanttLineClickEvent } from '../../class';
import { GANTT_UPPER_TOKEN, GanttUpper } from '../../gantt-upper';

@Component({
    selector: 'gantt-main',
    templateUrl: './gantt-main.component.html'
})
export class GanttMainComponent implements OnInit {
    public root: Element;
    public virtualDom: Element;
    public startMove: number = 0;
    public endMove: number = 0;

    @Input() groups: GanttGroupInternal[];

    @Input() items: GanttItemInternal[];

    @Input() groupHeaderTemplate: TemplateRef<any>;

    @Input() itemTemplate: TemplateRef<any>;

    @Input() barTemplate: TemplateRef<any>;

    @Input() rangeTemplate: TemplateRef<any>;
    
    @Input() visibleType: string;

    @Output() barClick = new EventEmitter<GanttBarClickEvent>();

    @Output() contextmenu = new EventEmitter<GanttBarClickEvent>();

    @Output() doubleClick = new EventEmitter<GanttBarClickEvent>();

    @Output() lineClick = new EventEmitter<GanttLineClickEvent>();

    @HostBinding('class.gantt-main-container') ganttMainClass = true;

    @ViewChild('ganttMainItems') ganttMainItem: ElementRef;
    @ViewChild('virtualBox') virtualBox: ElementRef;

    flag: boolean = false;

    constructor(@Inject(GANTT_UPPER_TOKEN) public ganttUpper: GanttUpper, private elementRef: ElementRef<HTMLElement>) {}

    ngOnInit() {
        this.getRootDom(this.elementRef);
    }

    trackBy(item: GanttGroupInternal | GanttItemInternal, index: number) {
        return item.id || index;
    }

    scrollCenter(item) {
        // console.log('这是子组件的居中事件');
        this.root.scrollLeft = item.refs.x - 20;
    }

    getRootDom(root: ElementRef<HTMLElement>) {
        this.root = root.nativeElement;
        // console.log('获取gantt-main-container的DOM对象');
    }
    // 每次移动后都要把 vir-box 元素重置
    resetVirBoxDom(root: ElementRef) {
        root.nativeElement.querySelector('.vir-box').style.transform = "translate3d(0px, 0px, 0px)"
        // console.log('获取gantt-main-container的DOM对象');
    }

    // mousedown
    mainMouseDown(e) {
        // console.log('start');
    }
    // mouseenter
    mainMouseEnter(e) {
        this.startMove = e.distance.x;
        let boxWidth = this.virtualBox.nativeElement.style.width.split("px")[0]*1;
        let clientWidth = this.root.clientWidth;
        let scrollWidth = boxWidth - clientWidth;

        // console.log(e.distance.x);
        // console.log(this.root.scrollLeft);
        // console.log(this.root.clientWidth);
        // console.log(scrollWidth);
        // console.log("===============");

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
        
        this.root.scrollLeft -= moveDistance;
        
        this.endMove = this.startMove;
        
    }
    // mouseup
    mainMouseUp(e) {
        this.resetVirBoxDom(this.elementRef);
        this.flag = false;
        this.startMove = 0;
        this.endMove = 0;
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
