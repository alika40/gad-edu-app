import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { CoursesService } from './courses.service';
import { Course } from '../courses.model';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  courses: Course[] = [];
  totalCourseCount = 0;
  showMoreOrLess = 100;
  currentPage = 1;
  coursesPerPage = 10;
  pageSize = [ 5, 10, 25, 50 ];
  private subs: Subscription = new Subscription();

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {

    this.coursesService.getCourses();

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
    this.coursesService.getCourses(this.currentPage, this.coursesPerPage);
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
