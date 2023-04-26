import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IsLoadingMiniService } from '../isloading-mini.service';
import { Course } from '../course.model';
import { CourseReview } from './course.model';


const BACKEND_URL_DATA = environment;



@Injectable(/*{
  providedIn: 'root'
}*/)
export class CourseService {



  constructor(  private http: HttpClient,
                private isLoadingMiniService: IsLoadingMiniService ) {}





  
  getCourseData(courseID: string): Observable<any> {
    const queryParam = `/course/${courseID}`;
    return this.http.get<{course: Course, other_courses: Course[]}>(BACKEND_URL_DATA.api_URL + queryParam)
    .pipe(map((data) => {
      return { course: data.course, courses: data.other_courses};
      })
    );

  }



  getCourseReviews(courseID: number, pageNo: number, pageSize: number): Observable<{reviews: CourseReview[], count: number}> {
    const queryParam = `/course/${courseID}/reviews/?page=${pageNo}&page_size=${pageSize}`;
    const data$ = this.http.get<{reviews: CourseReview[], count: number}>(BACKEND_URL_DATA.api_URL + queryParam);
    return this.isLoadingMiniService.showContentUntilCompleted(data$);

  }


}
