import { Injectable } from '@angular/core';
import {  MatSnackBar,
          MatSnackBarHorizontalPosition,
          MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';




@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  // SnackBar Property
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';



  constructor(private snackBar: MatSnackBar) { }


  // SnackBar Method for action notification
  dismissableSnackBarDelay(messages: string, icons: string, styleTextx: string, showIcon: string, styleIcons: string): void {
      const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
          data: { message: messages,
                  icon: icons,
                  styleText: styleTextx,
                  actionIcon: showIcon,
                  styleIcon: styleIcons,
                  preClose: () => {snackBarRef.dismiss(); } },
          duration: 15000, // 15sec
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: ['snack-bar-class-style', 'snackBar-BG'] // Style in style.css file
      });
  }


}
