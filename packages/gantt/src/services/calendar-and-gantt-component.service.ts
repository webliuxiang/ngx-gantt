import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class CalendarAndGanttComponentService {
    constructor() {}

    dragMoveDistance: number = 0;
    dragMoveDistance$ = new BehaviorSubject<number>(this.dragMoveDistance);

    setDistance(distance) {
      this.dragMoveDistance = distance;
      this.dragMoveDistance$.next(this.dragMoveDistance);
    }
}
