import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IsLoadingMiniService } from '../isloading-mini.service';
import { Course } from '../courses.model';
import { CourseReview } from './course.model';


const BACKEND_URL_DATA = environment;



@Injectable({
  providedIn: 'root'
})
export class CourseService {



  constructor(  private http: HttpClient,
                private isLoadingMiniService: IsLoadingMiniService ) {}





  
  getCourseData(courseID: string): Observable<any> {
    const queryParam = `/course/${courseID}`;
    return this.http.get<{course: Course, otherCourses: Course[]}>(BACKEND_URL_DATA.api_URL + queryParam)
    .pipe(map((data) => {
      return {
              course: {
                    id: data.course.id,
                    title: data.course.title,
                    url: data.course.url,
                    price: data.course.price,
                    discount_price: data.course.discount_price,
                    headline: data.course.headline,
                    rating: data.course.rating,
                    num_reviews: data.course.num_reviews,
                    description: data.course.description,
                    image_480x270: data.course.image_480x270,
                    primary_category: { title: data.course.primary_category.title, url: data.course.primary_category.url },
                    created: data.course.created,
                    objectives_summary: data.course.objectives_summary,
                    requirements_data: { items: data.course.requirements_data.items},
                    visible_instructors: data.course.visible_instructors,
              },
              courses: data.otherCourses
            };
      })
    );

  }



  getCourseReviews(courseID: number, pageNo: number, pageSize: number): Observable<{reviews: CourseReview[], count: number}> {
    const queryParam = `/course/${courseID}/reviews/?page=${pageNo}&page_size=${pageSize}`;
    const data$ = this.http.get<{reviews: CourseReview[], count: number}>(BACKEND_URL_DATA.api_URL + queryParam);
    return this.isLoadingMiniService.showContentUntilCompleted(data$);

  }


}
