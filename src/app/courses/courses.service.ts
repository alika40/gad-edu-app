import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IsLoadingService } from '../core/services/isloading.service';
import { Course } from '../courses.model';


const BACKEND_URL_DATA = environment;



@Injectable(/*{
  providedIn: 'root'
}*/)
export class CoursesService {


  constructor(  private http: HttpClient,
                private isLoadingService: IsLoadingService ) {}




  getCourses(groupCourse = '', currentPage = 1, coursesPerPage = 10): Observable<{courses: Course[], courseCount: number}> {
    // Backend Params for pagination
    const queryParamA = `/courses/?page=${currentPage}&page_size=${coursesPerPage}`;
    const queryParamB = `/courses/?page=${currentPage}&page_size=${coursesPerPage}&search=${groupCourse}`;
    const uriA = BACKEND_URL_DATA.api_URL + queryParamA;
    const uriB = BACKEND_URL_DATA.api_URL + queryParamB;
    const encodedURI = groupCourse ? encodeURI(uriB) : uriA;

    const data$ = this.http.get<{courses: Course[], courseCount: number}>(encodedURI)
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
    return this.isLoadingService.showContentUntilCompleted(data$); // Spinner Action
  }


}
