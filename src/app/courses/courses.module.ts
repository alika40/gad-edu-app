import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { MaterialModule } from '../material.module';
import { CoursesService } from './courses.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    CoursesService
  ]
})
export class CoursesModule { }
