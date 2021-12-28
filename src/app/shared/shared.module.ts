import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsloadingMiniComponent } from './isloading-mini/isloading-mini.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [IsloadingMiniComponent],
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
