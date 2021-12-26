import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IsLoadingService } from '../core/services/isloading.service';
import { Course } from '../courses.model';


const BACKEND_URL_DATA = environment;



@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses: Course[] = [];
  private subject = new Subject<{courses: Course[], courseCount: number}>();

  constructor(  private http: HttpClient,
                private isLoadingService: IsLoadingService ) {}




  getCoursesListener(): Observable<{courses: Course[], courseCount: number}> {
    return this.subject.asObservable();
  }


  getCourses(groupCourse = '', currentPage = 1, coursesPerPage = 10): void {
    // Backend Params for pagination
    // const queryParamA = `/courses/?page=${currentPage}&page_size=${coursesPerPage}`;
    // const queryParamB = `/courses/?page=${currentPage}&page_size=${coursesPerPage}&category=${groupCourse}`;
    // const queryParam = groupCourse ? queryParamB : queryParamA;
    const reqData = {groupCourse, currentPage, coursesPerPage};
    const data$ = this.http.post<{courses: Course[], courseCount: number}>(BACKEND_URL_DATA.api_URL + '/courses', reqData)
    .pipe(map((data) => {
      return { courses: data.courses.map((course: Course) => {
        return {
                id: course.id,
                title: course.title,
                url: course.url,
                price: course.price,
                discount_price: '',
                headline: course.headline,
                rating: 0,
                num_reviews: 0,
                description: '',
                image_480x270: course.image_480x270,
                primary_category: { title: '', url: '' },
                created: '',
                objectives_summary: [],
                requirements_data: { items: []},
                visible_instructors: course.visible_instructors
              };
        }),
        courseCount: data.courseCount
      };
    }));
    this.isLoadingService.showContentUntilCompleted(data$) // Spinner Action
    .subscribe(transformedData => {
      this.courses = transformedData.courses;
      this.subject.next({courses: [...this.courses], courseCount: transformedData.courseCount});
    });
  }


}
