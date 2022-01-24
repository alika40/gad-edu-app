import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { CoursesService } from './courses.service';
import { Course } from '../courses.model';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Seo } from '../seo.model';
import { SeoService } from '../seo.service';



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
  content: Seo | any;
  private subs: Subscription = new Subscription();
  private isBrowser = isPlatformBrowser(this.platformId);



  constructor(  private coursesService: CoursesService,
                private breakpointObserver: BreakpointObserver,
                private router: Router,
                private route: ActivatedRoute,
                private seoService: SeoService,
                @Inject(PLATFORM_ID) private readonly platformId: object) { this.SEO(); }


  ngOnInit(): void {

    this.onGetCourses();
    this.customBreakPoints();

  }




  private onGetCourses(): void {

    this.category = this.route.snapshot.params['cat'];
    if (this.category ) {

        this.coursesService.getCourses(this.category, this.currentPage, this.coursesPerPage)
        .subscribe( (data: {courses: Course[], courseCount: number}) => { 
                    this.courses = data.courses;
                    this.totalCourseCount = data.courseCount;
        });

    }
    else {

        this.coursesService.getCourses()
        .subscribe( (data: {courses: Course[], courseCount: number}) => { 
                    this.courses = data.courses;
                    this.totalCourseCount = data.courseCount;
        });

    }

  }





  private customBreakPoints(): void {

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



  
  private SEO(): void {

      let url = '';
      const imgURL = url.split('courses');

      if (this.isBrowser) {
          url = window.location.href;
      }
      this.content = {
                intro: '',
                setTitle: 'Explore eSCHOOL Courses',
                card: 'summary',
                site: 'eSCHOOL',
                title: 'Online Courses',
                description: `Join 1,000s of learners and have unlimited access to the best courses, 
                                hands-on projects, and job-ready and promotionalcertificate programs.`,
                image: imgURL[0] + 'assets/images/site-logo.png',
                image_alt: 'Site Logo',
                updated_time: new Date(),
                url: url,
                type: 'Provides Online Courses on Different Fields'
            };

      this.seoService.SEOmetadata(this.content);

  }





  takeCourse(courseURL: string): void {
    if (this.isBrowser) {

        window.location.href = `https://www.udemy.com${courseURL}`;

    }
  }




  courseDetails(courseID: number): void {

    this.router.navigate(['/course', courseID]);

  }




  onPageChange(pageData: PageEvent): any {
    this.currentPage = pageData.pageIndex + 1;
    this.coursesPerPage = pageData.pageSize;
    let data$;
    if ( this.category ) {
      data$ = this.coursesService.getCourses(this.category, this.currentPage, this.coursesPerPage);
    }
    else {
      data$ = this.coursesService.getCourses('', this.currentPage, this.coursesPerPage);
    }

    data$.subscribe( (data: {courses: Course[], courseCount: number}) => { 
            this.courses = data.courses;
            this.totalCourseCount = data.courseCount;
    });
    this.router.navigate(['/courses'], {fragment: `courses_${this.currentPage}`});
    
  }




  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
