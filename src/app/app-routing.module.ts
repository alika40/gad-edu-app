import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses/courses.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {path: '**', component: CoursesComponent },
// { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
