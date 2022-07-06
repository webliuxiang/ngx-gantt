import { GanttViewOptions, GanttViewDate } from './view';
import { GanttDate } from '../utils/date';
import { GanttViewType } from '../class/view-type';
import { GanttViewYear } from './year';
import { GanttViewQuarter } from './quarter';
import { GanttViewMonth } from './month';
import { GanttViewWeek } from './week';
import { GanttViewDay } from './day';
import { GanttViewHour } from './hour';

export function createViewFactory(type: GanttViewType, start: GanttViewDate, end: GanttViewDate, options?: GanttViewOptions) {
    switch (type) {
        case GanttViewType.year:
            return new GanttViewYear(start, end, options);
        case GanttViewType.quarter:
            return new GanttViewQuarter(start, end, options);
        case GanttViewType.month:
            return new GanttViewMonth(start, end, options);
        case GanttViewType.week:
            return new GanttViewWeek(start, end, options);
        case GanttViewType.day:
            return new GanttViewDay(start, end, options);
        case GanttViewType.hour:
            return new GanttViewHour(start, end, options);
        default:
            throw new Error('gantt view type invalid');
    }
}
