import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class IsLoadingMiniService {

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor() { }



  showContentUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.isLoadingOn() ),
      concatMap(() => obs$),
      finalize(() => {
        this.isLoadingOff();
      })
    );
  }

  isLoadingOn(): void {
    this.isLoadingSubject.next(true);
  }

  isLoadingOff(): void {
    this.isLoadingSubject.next(false);
  }


}

