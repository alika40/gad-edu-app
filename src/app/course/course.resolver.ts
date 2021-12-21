import { Injectable } from '@angular/core';
import {  Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { IsLoadingService } from '../core/services/isloading.service';
import { CourseService } from './course.service';




@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<any> {


  constructor(public courseService: CourseService, private isLoadingService: IsLoadingService) { }

  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    const courseID: string = route.params['courseID'];

    const courseData$ = this.courseService.getCourseData(courseID)
    .pipe(
            catchError((error: any) => {
                // console.error(error);
                return throwError(() => new Error('Can not fetch data'));
            })
        );

    const obs$: Observable<any> = this.isLoadingService.showContentUntilCompleted(courseData$);
    return obs$;
  }
}
