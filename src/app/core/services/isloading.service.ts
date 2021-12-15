import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { concatMap, finalize, tap } from 'rxjs/operators';



@Injectable(/*{
  providedIn: 'root'
}*/)
export class IsLoadingService {

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private overlaySubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  overlaySubject$: Observable<boolean> = this.overlaySubject.asObservable();

  constructor() { }



  showContentUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => {
        this.overlayOpen();
        this.isLoadingOn();
      }),
      concatMap(() => obs$),
      finalize(() => {
        this.overlayClose();
        timer(500).subscribe( () => this.isLoadingOff() );
      })
    );
  }

  isLoadingOn(): void {
    this.isLoadingSubject.next(true);
  }

  isLoadingOff(): void {
    this.isLoadingSubject.next(false);
  }

  overlayOpen(): void {
    this.overlaySubject.next(false);
  }

  overlayClose(): void {
    this.overlaySubject.next(true);
  }


}

