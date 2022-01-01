import {  Component, ElementRef,
  OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatBottomSheet, MatBottomSheetConfig} from '@angular/material/bottom-sheet';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Course } from '../courses.model';
import { SocialShareBottomSheetComponent } from './social-share-bottom-sheet/social-share-bottom-sheet.component';



const BACKEND_URL_DATA = environment;



@Component({
selector: 'app-course',
templateUrl: './course.component.html',
styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

  course: Course | any;
  courses: Course[] = [];
  description:SafeHtml | any;
  cols = 2;
  rowHeight = '60px';
  gutterSize = '.5rem';
  private subs: Subscription = new Subscription();
  @ViewChild('smooth') private divElem: ElementRef<HTMLDivElement> | any;



    constructor(  readonly bottomSheet: MatBottomSheet,
            private route: ActivatedRoute,
            private router: Router,
            private title: Title,
            private meta: Meta,
            private breakpointObserver: BreakpointObserver,
            private sanitizer: DomSanitizer ) { }

    ngOnInit(): void {

        this.getCourse();
        this.customBreakPIonts();
        this.scrollToSectionHook();

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
        const url = `${BACKEND_URL_DATA.api_URL}/${course.id}`;

        bottomShtConfig.disableClose = false;
        bottomShtConfig.autoFocus = true;
        bottomShtConfig.restoreFocus = true;
        bottomShtConfig.data = { theme: 'circles-dark', url,  courseTitle: course.title };
        bottomShtConfig.ariaLabel = 'Share on social media';
        bottomShtConfig.closeOnNavigation = true,
        bottomShtConfig.panelClass = 'bottom-sheet-class-style';
        bottomShtConfig.hasBackdrop = true;

        this.bottomSheet.open(SocialShareBottomSheetComponent, bottomShtConfig);

    }



    private scrollToSectionHook(): void {
        this.subs.add(
            this.router.events.subscribe(event => {
              if (event instanceof NavigationEnd) {
                  const tree = this.router.parseUrl(this.router.url);
                  if (tree.fragment) {
                      const element = this.divElem.nativeElement;
                      if (element) {
                          setTimeout(() => {
                              element.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'start',
                                                inline: 'nearest'
                                      });
                          }, 1000 );
                      }
                  }
              }
            })
        );

    }



  // Search Engine Optimization
  private SEOmetadata(course: Course): void {

      const url = `${BACKEND_URL_DATA.api_URL}/${course.id}`;
      const intro = course.visible_instructors[0];

      // SEO metadat
      this.title.setTitle(`eSCHOOL | ${course.title}`);
      this.meta.addTag({name: 'description', content: intro.job_title});

      // Twitter metadata
      this.meta.addTag({name: 'twitter:card', content: 'summary'});
      this.meta.addTag({name: 'twitter:site', content: 'eSCHOOL'});
      this.meta.addTag({name: 'twitter:title', content: course.title});
      this.meta.addTag({name: 'twitter:description', content: course.primary_category.title});
      this.meta.addTag({name: 'twitter:text:description', content: intro.job_title});
      this.meta.addTag({name: 'twitter:image', content: course.image_480x270});


      // Facebook metadata
      this.meta.addTag({name: 'og:url', content: url});
      this.meta.addTag({name: 'og:type', content: course.primary_category.title});
      this.meta.addTag({name: 'og:site_name', content: 'eSCHOOL'});
      this.meta.addTag({name: 'og:title', content: course.title});
      this.meta.addTag({name: 'og:description', content: intro.job_title});
      this.meta.addTag({name: 'og:image', content: course.image_480x270});
      this.meta.addTag({name: 'og:image:secure_url', content: course.image_480x270});
  }



  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }

}
