import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { MaterialModule } from '../material.module';
import { CourseCategoryComponent } from './course-category/course-category.component';


@NgModule({
  declarations: [CoursesComponent, CourseCategoryComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule,

  ]
})
export class CoursesModule { }
