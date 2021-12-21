import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetConfig} from '@angular/material/bottom-sheet';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
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


  constructor(  readonly bottomSheet: MatBottomSheet,
                private route: ActivatedRoute,
                private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.getCourse();

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


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
