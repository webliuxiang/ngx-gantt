import { GanttDatePoint } from '../class/date-point';
import { eachWeekOfInterval, GanttDate } from '../utils/date';
import { GanttView, GanttViewDate, GanttViewOptions, primaryDatePointTop, secondaryDatePointTop } from './view';

const viewOptions: GanttViewOptions = {
    cellWidth: 35,
    start: new GanttDate().startOfYear().startOfWeek({ weekStartsOn: 1 }),
    end: new GanttDate().endOfYear().endOfWeek({ weekStartsOn: 1 }),
    addAmount: 0,
    addUnit: 'month'
};

export class GanttViewWeek extends GanttView {
    constructor(start: GanttViewDate, end: GanttViewDate, options?: GanttViewOptions) {
        super(start, end, Object.assign({}, viewOptions, options));
    }

    startOf(date: GanttDate) {
        return date.startOfWeek({ weekStartsOn: 1 });
    }

    endOf(date: GanttDate) {
        return date.endOfWeek({ weekStartsOn: 1 });
    }

    getPrimaryWidth() {
        return this.getCellWidth();
    }

    getDayOccupancyWidth(): number {
        return this.cellWidth / 7;
    }

    getPrimaryDatePoints(): GanttDatePoint[] {
        const weeks = eachWeekOfInterval({ start: this.start.value, end: this.end.addSeconds(1).value }, { weekStartsOn: 1 });
        const points: GanttDatePoint[] = [];
        for (let i = 0; i < weeks.length; i++) {
            const weekStart = new GanttDate(weeks[i]);
            const increaseWeek = weekStart.getDaysInMonth() - weekStart.getDate() >= 3 ? 0 : 1;
            const point = new GanttDatePoint(
                weekStart,
                weekStart.addWeeks(increaseWeek).format('yyyy/MM'),
                this.getCellWidth() / 2 + i * this.getCellWidth(),
                primaryDatePointTop
            );
            let flag = false;
            for (let index = 0; index < points.length; index++) {
                const element = points[index];
                if (element.text === point.text) {
                    flag = true;
                    element.start = point.start;
                    element.x = point.x;
                    element.y = point.y;
                }
            }
            if (!flag) {
                points.push(point);
            }
        }
        return points;
    }

    getSecondaryDatePoints(): GanttDatePoint[] {
        const weeks = eachWeekOfInterval({ start: this.start.value, end: this.end.value });
        const points: GanttDatePoint[] = [];
        for (let i = 0; i < weeks.length; i++) {
            const start = new GanttDate(weeks[i]);
            const point = new GanttDatePoint(
                start,
                `W${Number(start.format('w')) > 9 ? start.format('w') : '0' + start.format('w')}`,
                i * this.getCellWidth() + this.getCellWidth() / 2,
                secondaryDatePointTop
            );
            points.push(point);
        }
        return points;
    }
}
