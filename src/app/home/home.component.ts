import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Seo } from '../seo.model';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private content: Seo | any;
  private subs: Subscription = new Subscription();
  private isBrowser = isPlatformBrowser(this.platformId);
  @ViewChild('smooth') private divElem: ElementRef<HTMLDivElement> | any;


  courses_categories = ['Free Courses','Business', 'Design', 'Development', 'Finance & Accounting',
                        'Health & Fitness', 'IT & Software', 'Lifestyle', 'Marketing',
                        'Music', 'Office', 'Productivity', 'Personal Development',
                        'Photography & Video', 'Teaching & Academics', 'Paid Courses'];


  constructor(  private router: Router,
                private seoService: SeoService,
                @Inject(PLATFORM_ID) private readonly platformId: object) { this.SEO(); }

  ngOnInit(): void {

    this.scrollToSectionHook();

  }


  private scrollToSectionHook(): void {
    this.subs.add(
        this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
              const tree = this.router.parseUrl(this.router.url);
              if (tree.fragment) {
                  const element = this.divElem.nativeElement;
                  if (element) {
                      setTimeout(() => {
                          element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
                      }, 1000 );
                  }
              }
          }
        })
    );

  }




  private SEO(): void {

    let url = '';
    if (this.isBrowser) {
        url = window.location.href;
    }
    this.content = {
              intro: '',
              setTitle: 'Home | eSCHOOL',
              card: '',
              site: 'eSCHOOL',
              title: 'Online Courses',
              description: 'Provides Online Courses on Different Fields',
              textDescription: '',
              image: 'assets/images/ivan-aleksic-unsplash.jpg',
              url: url,
              type: 'Provides Online Courses on Different Fields'
          };

    this.seoService.SEOmetadata(this.content);

  }

}
