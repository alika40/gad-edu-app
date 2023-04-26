import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IsLoadingService } from '../core/services/isloading.service';
import { Courses } from '../courses.model';


const BACKEND_URL_DATA = environment;



@Injectable(/*{
  providedIn: 'root'
}*/)
export class CoursesService {


  constructor(  private http: HttpClient,
                private isLoadingService: IsLoadingService ) {}




  getCourses(groupCourse = '', currentPage = 1, coursesPerPage = 10): Observable<{courses: Courses[], course_count: number}> {
    // Backend Params for pagination
    const queryParamA = `/courses/?page=${currentPage}&page_size=${coursesPerPage}`;
    const queryParamB = `/courses/?page=${currentPage}&page_size=${coursesPerPage}&search=${groupCourse}`;
    const uriA = BACKEND_URL_DATA.api_URL + queryParamA;
    const uriB = BACKEND_URL_DATA.api_URL + queryParamB;
    const encodedURI = groupCourse ? encodeURI(uriB) : uriA;

    const data$ = this.http.get<{courses: Courses[], course_count: number}>(encodedURI)
    .pipe(map((data) => {
      return { courses: data.courses, course_count: data.course_count };
    }));
    return this.isLoadingService.showContentUntilCompleted(data$); // Spinner Action
  }


}
