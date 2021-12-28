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

  reviews: CourseReview[] = [];
  pageNo = 1;
  pageSize = 10;
  reviewCount = 0;
  private pageIndex = this.pageSize;
  private pageNoTracker = this.pageNo;
  public pageSizeTracker = this.pageSize;
  private pageSizeReset = this.pageSize;
  private courseID = 0;
  private subs: Subscription = new Subscription();


  constructor(
              private route: ActivatedRoute,
              private courseService: CourseService) { }

  ngOnInit() {

      this.subs.add(
                    this.route.parent?.params
                    .subscribe((params: ParamMap | any) => {
                                    this.courseID = params.courseID;
                                    this.getCourseReviews(params.courseID, this.pageNo, this.pageSize);
                                  })
      );

  }


  private getCourseReviews(courseID: number, pageNo: number, pageSize: number): void {
    if (courseID) {
      this.courseService.getCourseReviews(courseID, pageNo, pageSize)
      .subscribe( (data: {reviews: CourseReview[], count: number}) => {
            this.reviews = data.reviews;
            this.reviewCount = data.count;
      });
    }
  }



  previousBtn(): void {

    this.pageNo -= this.pageIndex;
    this.pageSizeTracker = this.pageSize === this.reviewCount ?
                            this.pageSizeTracker : this.pageSizeReset; 
    this.pageSize -= this.pageSizeTracker;
    this.pageNoTracker--;
    this.getCourseReviews(this.courseID, this.pageNoTracker, this.pageSizeTracker);

  }



  nextBtn(): void {

    this.pageNo += this.pageIndex;
    this.pageSizeTracker = (this.pageSize + this.pageSizeTracker) > this.reviewCount ?
                            (this.reviewCount - this.pageSize) : this.pageSizeTracker; 
    this.pageSize += this.pageSizeTracker;
    this.pageNoTracker++;
    this.getCourseReviews(this.courseID, this.pageNoTracker, this.pageSizeTracker);

  }



  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
