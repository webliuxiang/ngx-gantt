import { GanttView, GanttViewOptions, primaryDatePointTop, secondaryDatePointTop, GanttViewDate } from './view';
import { GanttDate, differenceInCalendarQuarters, eachDayOfInterval,eachHourOfInterval,differenceInHours } from '../utils/date';
import { GanttDatePoint } from '../class/date-point';

const viewOptions: GanttViewOptions = {
    cellWidth: 30,
    start: new GanttDate().startOfYear().startOfDay(),
    end: new GanttDate().endOfYear().endOfDay(),
    addAmount: 1,
    addUnit: 'day',
    viewType: 'hour'
};

export class GanttViewHour extends GanttView {
    showWeekBackdrop = true;

    showTimeline = false;

    constructor(start: GanttViewDate, end: GanttViewDate, options?: GanttViewOptions) {
        super(start, end, Object.assign({}, viewOptions, options));
    }

    startOf(date: GanttDate) {
        return date.startOfDay();
    }

    endOf(date: GanttDate) {
        return date.endOfDay();
    }

    getPrimaryWidth() {
        return this.getCellWidth() * 24;
    }

    getDayOccupancyWidth(): number {
        return this.cellWidth * 24;
    }

    getPrimaryDatePoints(): GanttDatePoint[] {
        const days = eachDayOfInterval({ start: this.start.value, end: this.end.value });
        
        const points: GanttDatePoint[] = [];
        for (let i = 0; i < days.length; i++) {
            const start = new GanttDate(days[i]);
            const point = new GanttDatePoint(
                start,
                start.format('yyyy/MM/dd'),
                (this.getCellWidth() * 24) + i * (this.getCellWidth() * 24),
                primaryDatePointTop
            );
            points.push(point);
        }
        return points;
    }

    getSecondaryDatePoints(): GanttDatePoint[] {
        const hours = eachHourOfInterval({ start: this.start.value, end: this.end.value });
        
        const points: GanttDatePoint[] = [];
        for (let i = 0; i < hours.length; i++) {
            const start = new GanttDate(hours[i]);
            const point = new GanttDatePoint(
                start,
                start.getHours().toString(),
                i * this.getCellWidth() + this.getCellWidth() / 2,
                secondaryDatePointTop,
                {
                    isWeekend: start.isWeekend(),
                    isToday: start.isToday()
                }
            );
            points.push(point);
        }
        return points;
    }
}
