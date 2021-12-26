import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatBottomSheet, MatBottomSheetConfig} from '@angular/material/bottom-sheet';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../courses.model';
import { SocialShareBottomSheetComponent } from './social-share-bottom-sheet/social-share-bottom-sheet.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

  course: Course | any;
  courses: Course[] = [];
  description:SafeHtml | any;
  private subs: Subscription = new Subscription();
  @ViewChild('smooth') private divElem: ElementRef<HTMLDivElement> | any;



  constructor(  readonly bottomSheet: MatBottomSheet,
                private route: ActivatedRoute,
                private router: Router,
                private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.getCourse();
    this.scrollToSectionHook();

  }


  
  private getCourse(): void {

    this.route.data.subscribe((data) => {
                  this.course = data['courseData'].course;
                  this.courses = data['courseData'].courses;
                  this.description = this.sanitizer.bypassSecurityTrustHtml(this.course.description);
    })
      this.subs.add(
                  this.route.data.subscribe((data) => {
                        this.course = data['courseData'].course;
                        this.courses = data['courseData'].courses;
                        this.description = this.sanitizer.bypassSecurityTrustHtml(this.course.description);
                  })
      );

  }



  openBottomSheet(): void {
    const bottomShtConfig = new MatBottomSheetConfig();
    const url = window.location.href;

    bottomShtConfig.disableClose = false;
    bottomShtConfig.autoFocus = true;
    bottomShtConfig.restoreFocus = true;
    bottomShtConfig.data = { theme: 'circles-dark', url,  courseTitle: this.course?.title };
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
              // console.log(tree);
              if (tree.fragment) {
                  // const element = document.querySelector('#' + tree.fragment);
                  const element = this.divElem.nativeElement;
                  if (element) {
                      setTimeout(() => {
                          element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
                      }, 1000 );
                  }
              }
          }
        })
    );

  }



  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
