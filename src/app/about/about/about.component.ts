import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { faGithubAlt, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Seo } from 'src/app/seo.model';
import { SeoService } from 'src/app/seo.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  faGithubAlt = faGithubAlt;
  faGithub = faGithub;
  faWhatsapp = faWhatsapp;
  private content: Seo | any;
  private isBrowser = isPlatformBrowser(this.platformId);



  constructor( private seoService: SeoService,
                @Inject(PLATFORM_ID) private readonly platformId: object ) { this.SEO(); }

  ngOnInit(): void { }


  private SEO(): void {

    let url = '';
    const imgURL = url.split('about');

    if (this.isBrowser) {
        url = window.location.href;
    }

    const str = `We offer top-notch, high quality, online vidoe tutorials on different courses to our teeming 
                  users at an offordable price. We also offer free courses which comes with no certification. 
                  Our courses ranges from STEM (Science, Technology, Engineering and Mathematics) education to Personal Development`;
    this.content = {
              intro: str,
              setTitle: 'About Us | eSCHOOL',
              card: 'summary',
              site: 'eSCHOOL',
              title: 'About Us',
              description: str,
              image: imgURL[0] + 'assets/images/site-logo.png',
              image_alt: 'Site Logo',
              updated_time: new Date(),
              url: url,
              type: 'Provides Online Courses on Different Fields'
          };

    this.seoService.SEOmetadata(this.content);

}


}
