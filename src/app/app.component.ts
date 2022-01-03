import { Component, ChangeDetectorRef, OnInit, OnDestroy} from '@angular/core';

import { Title } from '@angular/platform-browser';
import { BreakpointObserver, BreakpointState, MediaMatcher, Breakpoints} from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { ThemeService } from './core/services/theme-manager.service';



export interface Topic {
  id: string;
  topic: string;
}




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  mobileQuery!: MediaQueryList;
  isHandset!: Observable<BreakpointState>;
  private mobileQueryListener!: () => void;

  
  constructor(private changeDetectorRef: ChangeDetectorRef,
              private media: MediaMatcher,
              private title: Title,
              private breakpointObserver: BreakpointObserver,
              private themeService: ThemeService,
              ) {}
  

  ngOnInit(): void {

    this.mobileQuery = this.media.matchMedia('(max-width: 768px)');


    this.themeService.autoSetTheme(); // On reload, retain current theme



    this.mobileQueryListener = () => {
      this.changeDetectorRef.detectChanges();
    };

    this.mobileQuery.addListener(this.mobileQueryListener);


    this.isHandset = this.breakpointObserver
                      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait]);


    this.title.setTitle('eSchool');

  }



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
