import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './core/error404/error404.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
        {
          path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
        },
        {
          path: 'course/:courseID', loadChildren: () => import('./course/course.module').then(m => m.CourseModule)
        },
        {
          path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
        },
        { path: 'home', component: HomeComponent },
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        {path: '**', component: Error404Component }, // Wildcard route for a 404 page
    ];




@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
                                  scrollPositionRestoration: 'enabled',
                                  anchorScrolling: 'enabled',
                                  initialNavigation: 'enabled'
  })
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
