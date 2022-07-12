import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class GanttItemDragDropService {
    constructor() {}

    dragStatus: boolean = false;
    dragStatus$ = new BehaviorSubject<boolean>(this.dragStatus);

    setDragStatus(status:boolean) {
        this.dragStatus = status;
        this.dragStatus$.next(this.dragStatus);
    }
}
