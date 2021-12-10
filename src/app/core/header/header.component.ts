import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  stateFlag = false;

  @Output() toggleSidenav = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  // Methods for Sidenav
  proxyToggleMenu(): void {
    this.stateFlag = !this.stateFlag
    this.toggleSidenav.emit(this.stateFlag);
  }

}
