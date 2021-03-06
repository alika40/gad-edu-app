import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { CourseRoutingModule } from './course-routing.module';
import { SharedModule } from '../shared/shared.module';

import { OtherCoursesComponent } from './other-courses/other-courses.component';
import { CourseComponent } from './course.component';
import { SocialShareBottomSheetComponent } from './social-share-bottom-sheet/social-share-bottom-sheet.component';
import { CourseReviewsComponent } from './course-reviews/course-reviews.component';
import { CourseService } from './course.service';
import { CarouselDirective } from './carousel.directive';





@NgModule({
  declarations: [
    OtherCoursesComponent,
    CourseComponent,
    SocialShareBottomSheetComponent,
    CourseReviewsComponent,
    CarouselDirective,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ShareButtonsModule,
    ShareIconsModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    CourseService
  ]
})
export class CourseModule { }
