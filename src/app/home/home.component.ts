import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Seo } from '../seo.model';
import { SeoService } from '../seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private content: Seo | any;
  private isBrowser = isPlatformBrowser(this.platformId);


  courses_categories = ['Free Courses','Business', 'Design', 'Development', 'Finance & Accounting',
                        'Health & Fitness', 'IT & Software', 'Lifestyle', 'Marketing',
                        'Music', 'Office', 'Productivity', 'Personal Development',
                        'Photography & Video', 'Teaching & Academics', 'Paid Courses'];


  constructor(  private seoService: SeoService,
                @Inject(PLATFORM_ID) private readonly platformId: object) { this.SEO(); }

  ngOnInit(): void { }




  private SEO(): void {

    let url = '';
    const imgURL = url.split('home');

    if (this.isBrowser) {
        url = window.location.href;
    }

    const str = `Join 1,000s of learners and have unlimited access to the best courses, 
                  hands-on projects, and job-ready and promotionalcertificate programs.`;
    this.content = {
              intro: str,
              setTitle: 'Home | eSCHOOL',
              card: '',
              site: 'eSCHOOL',
              title: 'Online Courses',
              description: str,
              image: imgURL + 'assets/images/ivan-aleksic-unsplash.jpg',
              image_alt: 'class Room',
              updated_time: new Date(),
              url: url,
              type: 'Provides Online Courses on Different Fields'
          };

    this.seoService.SEOmetadata(this.content);
  }


}
