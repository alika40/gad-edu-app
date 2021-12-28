import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  stateFlag = false;

  @Output() toggleSidenav = new EventEmitter<boolean>();

  constructor(private snackBar: SnackBarService,) { }

  ngOnInit(): void {
  }

  // Methods for Sidenav
  proxyToggleMenu(): void {
    this.stateFlag = !this.stateFlag
    this.toggleSidenav.emit(this.stateFlag);
  }

  notice(): void {
    this.snackBar.dismissableSnackBarDelay('Feature Unavailable', 'close', 'snack-bar-defaultText', 'info', 'snack-bar-icon-warn');
  }

}
