import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Seo } from './seo.model';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }



  SEOmetadata(content: Seo): void {

    // SEO metadat
    this.title.setTitle(content.setTitle);
    this.meta.addTag({name: 'description', content: content.intro});

    // Twitter metadata
    this.meta.addTag({name: 'twitter:card', content: content.card});
    this.meta.addTag({name: 'twitter:site', content: content.site});
    this.meta.addTag({name: 'twitter:title', content: content.title});
    this.meta.addTag({name: 'twitter:description', content: content.description});
    this.meta.addTag({name: 'twitter:text:description', content: content.textDescription});
    this.meta.addTag({name: 'twitter:image', content: content.image});


    // Facebook metadata
    this.meta.addTag({name: 'og:type', content: content.description});
    this.meta.addTag({name: 'og:site_name', content: content.site});
    this.meta.addTag({name: 'og:title', content: content.title});
    this.meta.addTag({name: 'og:description', content: content.intro});
    this.meta.addTag({name: 'og:image', content: content.image});
    this.meta.addTag({name: 'og:image:secure_url', content: content.image});
    this.meta.addTag({name: 'og:url', content: content.url});

  }


}
