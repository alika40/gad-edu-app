import { Component, ChangeDetectorRef, OnInit, OnDestroy} from '@angular/core';

import { Title } from '@angular/platform-browser';
import { BreakpointObserver, BreakpointState, MediaMatcher, Breakpoints} from '@angular/cdk/layout';

import { RouterOutlet } from '@angular/router';
import { AnimationTriggerMetadata } from '@angular/animations';
import { routerAnimation } from './core/animations';
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
  animations: [ routerAnimation()],
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
              // https://github.com/jeffhx/basic_course_analyzer/blob/master/gather_course_info_api.py
              // https://stackoverflow.com/questions/65550067/how-to-use-udemy-api-using-requests-module-in-python
              // https://www.udemy.com/developers/affiliate/methods/get-courses-list/
              // https://stackoverflow.com/questions/54619742/udemy-api-http-authorization
              // https://www.google.com/search?q=curl+--user+%7BYOUR_CLIENT_ID%7D%3A%7BYOUR_CLIENT_SECRET%7D&oq=curl+--user+%7BYOUR_CLIENT_ID%7D%3A%7BYOUR_CLIENT_SECRET%7D&aqs=chrome..69i57.1927j0j4&sourceid=chrome&ie=UTF-8


  ngOnInit(): void {

    this.mobileQuery = this.media.matchMedia('(max-width: 768px)');


    this.themeService.autoSetTheme(); // On reload, retain current theme



    this.mobileQueryListener = () => {
      this.changeDetectorRef.detectChanges();
    };

    // this.mobileQuery.addListener(this.mobileQueryListener); // Deprecated but compactible with older browsers
    this.mobileQuery.addEventListener('onChange', this.mobileQueryListener);


    this.isHandset = this.breakpointObserver
                      .observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait]);


    this.title.setTitle('Community Project | Production');

  }



  // For Router Animation of Sign in and Sign up pages
  public getRouteAnimation(outlet: RouterOutlet): AnimationTriggerMetadata {
    const res =
      outlet.activatedRouteData['num'] === undefined
        ? -1
        : outlet.activatedRouteData['num'] ;

    return res;
  }


  ngOnDestroy(): void {
    // this.mobileQuery.removeListener(this.mobileQueryListener); // Deprecated but compactible with older browsers
    this.mobileQuery.removeEventListener('onChange', this.mobileQueryListener);
  }

}
