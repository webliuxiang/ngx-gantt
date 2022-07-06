import { GanttDate } from '../utils/date';
import { BehaviorSubject } from 'rxjs';
import { GanttViewType } from './view-type';

interface GanttItemRefs {
    width: number;
    x: number;
    y: number;
    ac_width: number;
    ac_x: number;
    ac_y: number;
}

export enum GanttItemType {
    bar = 'bar',
    range = 'range',
    custom = 'custom'
}

export interface GanttItem<T = unknown> {
    id: string;
    title: string;
    start?: number;
    end?: number;
    ac_start?: number;
    ac_end?: number;
    group_id?: string;
    links?: string[];
    draggable?: boolean;
    linkable?: boolean;
    expandable?: boolean;
    expanded?: boolean;
    children?: GanttItem[];
    color?: string;
    ac_color?: string;
    itemcolor?: string;
    itemStyle?: Partial<CSSStyleDeclaration>;
    barStyle?: Partial<CSSStyleDeclaration>;
    origin?: T;
    type?: GanttItemType;
    progress?: number;
    ac_progress?: number;
}

export class GanttItemInternal {
    id: string;
    title: string;
    start: GanttDate;
    end: GanttDate;
    ac_start: GanttDate;
    ac_end: GanttDate;
    links: string[];
    color?: string;
    ac_color?: string;
    itemcolor?: string;
    itemStyle?: Partial<CSSStyleDeclaration>;
    barStyle?: Partial<CSSStyleDeclaration>;
    draggable?: boolean;
    linkable?: boolean;
    origin: GanttItem;
    expandable?: boolean;
    expanded?: boolean;
    loading: boolean;
    children: GanttItemInternal[];
    type?: GanttItemType;
    progress?: number;
    ac_progress?: number;
    viewType?: GanttViewType;
    visibleType?: string;

    get refs() {
        return this.refs$.getValue();
    }

    refs$ = new BehaviorSubject<{ width: number; x?: number; y?: number, ac_width: number; ac_x?: number; ac_y?: number }>(null);

    constructor(item: GanttItem, options?: { viewType: GanttViewType }) {
        this.origin = item;
        this.id = this.origin.id;
        this.links = this.origin.links || [];
        this.color = this.origin.color;
        this.ac_color = this.origin.ac_color;
        this.itemcolor = this.origin.itemcolor;
        this.itemStyle = this.origin.itemStyle;
        this.barStyle = this.origin.barStyle;
        this.linkable = this.origin.linkable === undefined ? true : this.origin.linkable;
        this.draggable = this.origin.draggable === undefined ? true : this.origin.draggable;
        this.expandable = this.origin.expandable || (this.origin.children || []).length > 0;
        this.expanded = this.origin.expanded === undefined ? false : this.origin.expanded;
        this.start = item.start ? new GanttDate(item.start) : null;
        this.end = item.end ? new GanttDate(item.end) : null;
        this.ac_start = item.ac_start ? new GanttDate(item.ac_start) : null;
        this.ac_end = item.ac_end ? new GanttDate(item.ac_end) : null;
        this.viewType = options && options.viewType ? options.viewType : GanttViewType.month;
        this.children = (item.children || []).map((subItem) => {
            return new GanttItemInternal(subItem, { viewType: this.viewType });
        });
        this.type = this.origin.type || GanttItemType.bar;
        this.progress = this.origin.progress;
        this.ac_progress = this.origin.ac_progress;
        // fill one month when start or end is null
        this.fillItemStartOrEnd(item);
    }

    fillItemStartOrEnd(item: GanttItem) {
        let addInterval: number;
        switch (this.viewType) {
            case GanttViewType.day:
            case GanttViewType.week:
                addInterval = 0;
                break;
            default:
                addInterval = 30;
                break;
        }
        if (item.start && !item.end) {
            this.end = new GanttDate(item.start).addDays(addInterval).endOfDay();
        }
        if (!item.start && item.end) {
            this.start = new GanttDate(item.end).addDays(-addInterval).startOfDay();
        }
        // actual
        if (item.ac_start && !item.ac_end) {
            this.ac_end = new GanttDate(item.ac_start).addDays(addInterval).endOfDay();
        }
        if (!item.ac_start && item.ac_end) {
            this.ac_start = new GanttDate(item.ac_end).addDays(-addInterval).startOfDay();
        }
    }

    updateRefs(refs: GanttItemRefs) {
        this.refs$.next(refs);
    }

    updateDate(start: GanttDate, end: GanttDate) {
        this.start = start.startOfDay();
        this.end = end.endOfDay();
        this.origin.start = this.start.getUnixTime();
        this.origin.end = this.end.getUnixTime();
    }
    // actual
    updateDateActual(start: GanttDate, end: GanttDate) {
        this.ac_start = start.startOfDay();
        this.ac_end = end.endOfDay();
        this.origin.ac_start = this.ac_start.getUnixTime();
        this.origin.ac_end = this.ac_end.getUnixTime();
    }

    addChildren(items: GanttItem[]) {
        this.origin.children = items;
        this.children = (items || []).map((subItem) => {
            return new GanttItemInternal(subItem, { viewType: this.viewType });
        });
    }

    setExpand(expanded: boolean) {
        this.expanded = expanded;
        this.origin.expanded = expanded;
    }

    addLink(linkId: string) {
        this.links = [...this.links, linkId];
        this.origin.links = this.links;
    }
}
