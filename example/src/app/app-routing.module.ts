import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGanttExampleComponent } from './gantt/gantt.component';
import { AppGanttFlatExampleComponent } from './gantt-flat/flat.component';
import { AppGanttRangeExampleComponent } from './gantt-range/gantt-range.component';
import { GanttTestComponent } from './gantt-test/gantt-test.component';
import { GanttDragDropComponent } from './gantt-drag-drop/gantt-drag-drop.component';


const routes: Routes = [
    {
        path: 'component',
        component: AppGanttExampleComponent,
    },
    {
        path: 'flat',
        component: AppGanttFlatExampleComponent,
    },
    {
        path: 'range',
        component: AppGanttRangeExampleComponent
    },
    {
        path: 'test',
        component: GanttTestComponent
    },
    {
        path: 'drag',
        component: GanttDragDropComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
