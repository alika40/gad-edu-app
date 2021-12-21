import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsloadingMiniComponent } from './isloading-mini/isloading-mini.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [SnackBarComponent, IsloadingMiniComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    IsloadingMiniComponent,
    SnackBarComponent
  ]
})
export class SharedModule { }
