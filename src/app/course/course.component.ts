import {  Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import {MatBottomSheet, MatBottomSheetConfig} from '@angular/material/bottom-sheet';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../courses.model';
import { Seo } from '../seo.model';
import { SocialShareBottomSheetComponent } from './social-share-bottom-sheet/social-share-bottom-sheet.component';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../seo.service';





@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

  course: Course | any;
  courses: Course[] = [];
  content: Seo  | any;
  description:SafeHtml | any;
  cols = 2;
  rowHeight = '60px';
  gutterSize = '.5rem';
  private subs: Subscription = new Subscription();
  private isBrowser = isPlatformBrowser(this.platformId);



  constructor(  readonly bottomSheet: MatBottomSheet,
                private route: ActivatedRoute,
                private seoService: SeoService,
                private breakpointObserver: BreakpointObserver,
                @Inject(PLATFORM_ID) private readonly platformId: object,
                private sanitizer: DomSanitizer ) { }

  ngOnInit(): void {

    this.getCourse();
    this.customBreakPIonts();

  }


  
  private getCourse(): void {

    this.subs.add(
                this.route.data.subscribe((data) => {
                      this.course = data['courseData'].course;
                      this.courses = data['courseData'].courses;
                      this.description = this.sanitizer.bypassSecurityTrustHtml(this.course.description);
                      this.SEOmetadata(this.course);
                })
    );
  
  }



  private customBreakPIonts() {

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

          }
          else if (breakPoints[Breakpoints.HandsetLandscape]) {
            
                this.cols = 1;

        }
        else if (breakPoints[Breakpoints.TabletLandscape]) {
            
                this.cols = 2;

        }
      })
    );

  }



  openBottomSheet(course: Course): void {

      const bottomShtConfig = new MatBottomSheetConfig();
      let url = '';

      bottomShtConfig.disableClose = false;
      bottomShtConfig.autoFocus = true;
      bottomShtConfig.restoreFocus = true;
      if (this.isBrowser) {
          url = window.location.href;
      }
      bottomShtConfig.data = { theme: 'circles-dark', courseURL: url, courseIntro: course.headline,   courseTitle: course.title };
      bottomShtConfig.ariaLabel = 'Share on social media';
      bottomShtConfig.closeOnNavigation = true,
      bottomShtConfig.panelClass = 'bottom-sheet-class-style';
      bottomShtConfig.hasBackdrop = true;
  
      this.bottomSheet.open(SocialShareBottomSheetComponent, bottomShtConfig);

  }




    // Search Engine Optimization
  private SEOmetadata(course: Course): void {

      const intro = course.visible_instructors[0];
      let url = '';
      if (this.isBrowser) {
          url = window.location.href;
    }
      this.content = {
                intro: intro.job_title,
                setTitle: 'Course Details | ' + course.title,
                card: 'summary',
                site: 'eSCHOOL',
                title: course.title,
                description: course.primary_category.title,
                image: course.image_480x270,
                image_alt: course.title,
                updated_time: course.created,
                url: url,
                type: course.primary_category.title
      };

      this.seoService.SEOmetadata(this.content);

  }



  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
