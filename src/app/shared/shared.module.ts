import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsloadingMiniComponent } from './isloading-mini/isloading-mini.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ScrollToSectionDirective } from './scroll-to-section.directive';



@NgModule({
  declarations: [IsloadingMiniComponent, ScrollToSectionDirective],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    IsloadingMiniComponent
  ]
})
export class SharedModule { }
