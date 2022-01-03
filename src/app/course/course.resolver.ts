import { Injectable, Inject,  PLATFORM_ID } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable, of} from 'rxjs';
import { isPlatformServer } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { IsLoadingService } from '../core/services/isloading.service';
import { CourseService } from './course.service';




@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<any> {


  constructor(  public courseService: CourseService,
                private isLoadingService: IsLoadingService, 
                @Inject(PLATFORM_ID) private platformId: any,
                private transferState: TransferState) { }

  
  resolve(route: ActivatedRouteSnapshot): Observable<any> {

    const courseID: string = route.params['courseID'];
    const COURSE_KEY = makeStateKey<any>('course-' + courseID);


    if (this.transferState.hasKey(COURSE_KEY)) {
      const course = this.transferState.get<any>(COURSE_KEY, null);
      this.transferState.remove(COURSE_KEY);
      return of(course);
    }
    else {
        const courseData$ = this.courseService.getCourseData(courseID)
            .pipe(
                tap(course => {
                    if (isPlatformServer(this.platformId)) {
                        this.transferState.set(COURSE_KEY, course);
                    }

                })
            );

            
        const obs$: Observable<any> = this.isLoadingService.showContentUntilCompleted(courseData$);
        return obs$;
    }
  }

}
