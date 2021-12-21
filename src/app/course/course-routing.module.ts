import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseReviewsComponent } from './course-reviews/course-reviews.component';
import { CourseComponent } from './course.component';
import { CourseResolver } from './course.resolver';



const routes: Routes = [
    {
        path: '', component: CourseComponent,
        resolve: { courseData: CourseResolver },
        children: [
            {
                path: 'reviews', component: CourseReviewsComponent
            }
        ]
    }
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [CourseResolver]
  })
  export class CourseRoutingModule { }