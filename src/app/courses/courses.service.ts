import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IsLoadingService } from '../core/services/isloading.service';
import { Course } from './course.model';


const BACKEND_URL_DATA = environment;



@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses: Course[] = [];
  private subject = new Subject<{courses: Course[], courseCount: number}>();

  constructor(
              private http: HttpClient,
              private isLoadingService: IsLoadingService
              ) { this.getCourses(); } // Initialize backend call




  getCoursesListener(): Observable<{courses: Course[], courseCount: number}> {
    return this.subject.asObservable();
  }


  getCourses(currentPage = 1, coursesPerPage = 10): void {
    // Backend Params for pagination
    const queryParam = `/courses/?page=${currentPage}&page_size=${coursesPerPage}`;
    const data$ = this.http.get<{courses: Course[], courseCount: number}>(BACKEND_URL_DATA.api_URL + queryParam)
    .pipe(map((data) => {
      return { courses: data.courses.map((course: Course) => {
        return {
                id: course.id,
                title: course.title,
                url: course.url,
                price: course.price,
                headline: course.headline,
                image_480x270: course.image_480x270,
                published_title: ''
              };
        }),
        courseCount: data.courseCount
      };
    }));
    this.isLoadingService.showContentUntilCompleted(data$) // Spinner Action
    .subscribe(transformedData => {
      this.courses = transformedData.courses;
      // Data stored to be Observed using Subject and/or asObservable() from rsjx
      this.subject.next({courses: [...this.courses], courseCount: transformedData.courseCount});
    });
  }


}
