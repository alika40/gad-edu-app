import { Component, OnInit, OnDestroy } from '@angular/core';
import {BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { IsLoadingService } from '../services/isloading.service';



@Component({
  selector: 'app-isloading',
  templateUrl: './isloading.component.html',
  styleUrls: ['./isloading.component.css']
})
export class IsloadingComponent implements OnInit, OnDestroy {

  private breakPointStateSub?: Subscription;
  private isLoadingServiceSub?: Subscription;
  public spinnerDiameter?: number;
  public underlayStrokeWidth?: number;
  public strokeWidth?: number;
  public sidnavToggleState?: boolean;

  constructor(public isLoadingService: IsLoadingService,
              private breakpointObserver: BreakpointObserver) { }


  ngOnInit(): void {


    this.breakPointStateSub = this.breakpointObserver
                                  .observe(['(max-width: 600px)'])
                                  .subscribe((state: BreakpointState) => {
                                    if (state.matches) {
                                      this.spinnerDiameter = 60;
                                      this.strokeWidth = 15;
                                      this.underlayStrokeWidth = 5;
                                    } else {
                                      this.strokeWidth = 10;
                                      this.underlayStrokeWidth = 10;
                                      this.spinnerDiameter = 80;
                                    }
                                  });


    this.isLoadingServiceSub = this.isLoadingService.overlaySubject$.subscribe((state: boolean) => {
                                                                      this.sidnavToggleState = state;
                                                                      // console.log(this.sidnavToggleState);
                                                                    });

  }

  ngOnDestroy(): void {
    if (this.breakPointStateSub) {
      this.breakPointStateSub.unsubscribe();
    }
    if (this.isLoadingServiceSub) {
      this.isLoadingServiceSub.unsubscribe();
    }
  }

}
