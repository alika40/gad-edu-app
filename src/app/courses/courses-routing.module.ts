import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseCategoryComponent } from './course-category/course-category.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  { path: 'category/:cat', component: CourseCategoryComponent },
  { path: '', component: CoursesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
