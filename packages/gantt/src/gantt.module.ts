import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxGanttComponent } from './gantt.component';
import { NgxGanttTableComponent } from './table/gantt-table.component';
import { NgxGanttTableColumnComponent } from './table/gantt-column.component';
import { GanttCalendarComponent } from './components/calendar/calendar.component';
import { GanttTableComponent } from './components/table/gantt-table.component';

import { NgxGanttBarComponent } from './components/bar/bar.component';
import { NgxGanttBarActualComponent } from './components/bar/bar-actual.component';

import { GanttMainComponent } from './components/main/gantt-main.component';
import { GanttIconComponent } from './components/icon/icon.component';
import { GanttDragBackdropComponent } from './components/drag-backdrop/drag-backdrop.component';
import { GanttLinksComponent } from './components/links/links.component';
import { NgxGanttRootComponent } from './root.component';
import { NgxGanttRangeComponent } from './components/range/range.component';
import { IsGanttRangeItemPipe, IsGanttBarItemPipe, IsGanttCustomItemPipe } from './gantt.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [CommonModule, DragDropModule],
    exports: [NgxGanttComponent, NgxGanttTableComponent, NgxGanttTableColumnComponent, NgxGanttRootComponent, NgxGanttBarComponent, NgxGanttBarActualComponent],
    declarations: [
        NgxGanttComponent,
        NgxGanttTableComponent,
        NgxGanttTableColumnComponent,
        GanttTableComponent,
        GanttMainComponent,
        GanttCalendarComponent,
        GanttLinksComponent,
        NgxGanttBarComponent,
        NgxGanttBarActualComponent,
        GanttIconComponent,
        GanttDragBackdropComponent,
        NgxGanttRangeComponent,
        NgxGanttRootComponent,
        IsGanttRangeItemPipe,
        IsGanttBarItemPipe,
        IsGanttCustomItemPipe,
    ],
    providers: []
})
export class NgxGanttModule {}
