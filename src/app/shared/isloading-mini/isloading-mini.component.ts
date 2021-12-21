import { Component, OnInit, OnDestroy } from '@angular/core';
// import {BreakpointState, MediaMatcher } from '@angular/cdk/layout';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

import { IsLoadingMiniService } from '../../isloading-mini.service';
// import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: 'app-isloading-mini',
  templateUrl: './isloading-mini.component.html',
  styleUrls: ['./isloading-mini.component.css']
})
export class IsloadingMiniComponent implements OnInit, OnDestroy {

  private breakPointStateSub: Subscription | any;
  public spinnerDiameter: number = 0;
  public underlayStrokeWidth: number = 0;
  public strokeWidth: number = 0;

  constructor(public isLoadingMiniService: IsLoadingMiniService,
              private breakpointObserver: BreakpointObserver,
              /*private layoutService: LayoutService*/) { }


  ngOnInit(): void {


    this.breakPointStateSub = this.breakpointObserver
                                  .observe(['(max-width: 600px)'])
                                  .subscribe((state: BreakpointState) => {
                                    if (state.matches) {
                                      this.spinnerDiameter = 30;
                                      this.strokeWidth = 6;
                                      this.underlayStrokeWidth = 3;
                                    } else {
                                      this.strokeWidth = 5;
                                      this.underlayStrokeWidth = 5;
                                      this.spinnerDiameter = 40;
                                    }
                                  });


  }

  ngOnDestroy(): void {
    if (this.breakPointStateSub) {
      this.breakPointStateSub.unsubscribe();
    }
  }

}
