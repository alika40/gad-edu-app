import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { CoursesService } from '../courses.service';
import { Course } from 'src/app/courses.model';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent implements OnInit, OnDestroy {

  courses: Course[] = [];
  totalCourseCount = 0;
  showMoreOrLess = 100;
  currentPage = 1;
  coursesPerPage = 10;
  pageSize = [ 5, 10, 25, 50 ];
  category = '';
  private subs: Subscription = new Subscription();

  constructor(private coursesService: CoursesService, private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.category = this.route.snapshot.params['cat'];
    if (this.category ) {
        this.coursesService.getCourses(this.category, this.currentPage, this.coursesPerPage);
    }

      this.subs.add(
                    this.coursesService
                    .getCoursesListener()
                    .subscribe( (data: {courses: Course[], courseCount: number}) => { 
                      this.courses = data.courses;
                      this.totalCourseCount = data.courseCount;
                      // console.log(data)
                    })
      );

  }


  onPageChange(pageData: PageEvent): any {
    this.currentPage = pageData.pageIndex + 1;
    this.coursesPerPage = pageData.pageSize;
    this.coursesService.getCourses(this.category, this.currentPage, this.coursesPerPage);
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
