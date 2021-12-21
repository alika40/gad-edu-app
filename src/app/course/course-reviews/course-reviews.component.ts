import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseReview } from '../course.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-reviews',
  templateUrl: './course-reviews.component.html',
  styleUrls: ['./course-reviews.component.css']
})
export class CourseReviewsComponent implements OnInit, OnDestroy {

  private subs: Subscription = new Subscription();
  reviews: CourseReview[] = [];

  constructor(
              private route: ActivatedRoute,
              private courseService: CourseService) { }

  ngOnInit() {

      this.subs.add(
                    this.route.parent?.params
                    .subscribe((params: ParamMap | any) => this.getCourseReviews(params.courseID) )
      );

  }


  private getCourseReviews(courseID: string): void {
    if (courseID) {
      this.courseService.getCourseReviews(courseID)
      .subscribe( data => this.reviews = data.reviews );
    }

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
