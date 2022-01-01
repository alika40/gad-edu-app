import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { CoursesService } from './courses.service';
import { Course } from '../courses.model';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  courses: Course[] = [];
  totalCourseCount = 0;
  showMoreOrLess = 80;
  currentPage = 1;
  coursesPerPage = 10;
  pageSize = [ 5, 10, 25, 50 ];
  category = '';
  cols = 2;
  rowHeight = '500px';
  gutterSize = '2.25rem';
  private subs: Subscription = new Subscription();


  constructor(  private coursesService: CoursesService,
                private breakpointObserver: BreakpointObserver,
                private router: Router,
                private route: ActivatedRoute   ) { }

  ngOnInit(): void {

    this.category = this.route.snapshot.params['cat'];
    if (this.category ) {
        this.coursesService.getCourses(this.category, this.currentPage, this.coursesPerPage);
    }
    else {

      this.coursesService.getCourses();
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

    this.subs.add(
                  this.breakpointObserver
                  .observe([
                    Breakpoints.HandsetPortrait,
                    Breakpoints.HandsetLandscape,
                    Breakpoints.TabletLandscape,
                    Breakpoints.TabletPortrait
                  ])
                  .subscribe((state: BreakpointState) => {
                      const breakPoints = state.breakpoints;
                      if (breakPoints[Breakpoints.HandsetPortrait] ||
                          breakPoints[Breakpoints.TabletPortrait]) {

                            this.cols = 1;
                            this.rowHeight = '485px';
                            this.gutterSize = '1rem';
                            this.showMoreOrLess = 50;


                      }
                      else if (breakPoints[Breakpoints.HandsetLandscape]) {
                        
                            this.cols = 1;
                            this.rowHeight = '490px';
                            this.gutterSize = '1.25rem';
                            this.showMoreOrLess = 60;

                    }
                    else if (breakPoints[Breakpoints.TabletLandscape]) {
                        
                            this.cols = 2;
                            this.rowHeight = '500px';
                            this.gutterSize = '2rem';

                    }
                  })
    );

  }



  takeCourse(courseURL: string): void {
        window.location.href = `https://www.udemy.com${courseURL}`;
  }



  courseDetails(courseID: number): void {
      this.router.navigate(['/course', courseID]);
  }



  onPageChange(pageData: PageEvent): any {
    this.currentPage = pageData.pageIndex + 1;
    this.coursesPerPage = pageData.pageSize;
    if ( this.category ) {
      this.coursesService.getCourses(this.category, this.currentPage, this.coursesPerPage);
    }
    else {
      this.coursesService.getCourses('', this.currentPage, this.coursesPerPage);
    }
  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
