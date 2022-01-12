import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Seo } from './seo.model';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }



  SEOmetadata(content: Seo): void {

    const slicedStr = content.intro.slice(0, 96) + '....';
    // SEO metadat
    this.title.setTitle(content.setTitle);
    this.meta.addTag({name: 'description', content: slicedStr});

    // Twitter metadata
    this.meta.addTag({name: 'twitter:card', content: content.card});
    this.meta.addTag({name: 'twitter:site', content: content.site});
    this.meta.addTag({name: 'twitter:title', content: content.title});
    this.meta.addTag({name: 'twitter:description', content: content.description});
    this.meta.addTag({name: 'twitter:image', content: content.image});
    this.meta.addTag({name: 'twitter:url', content: content.url});


    // Facebook, LinkedIn, and Google+ metadata
    this.meta.addTag({name: 'og:type', content: content.description});
    this.meta.addTag({name: 'og:site_name', content: content.site});
    this.meta.addTag({name: 'og:title', property: 'og:title', content: content.title});
    this.meta.addTag({name: 'og:description', property: 'og:description', content: slicedStr});
    this.meta.addTag({name: 'og:image', property: 'og:image', content: content.image}); //
    this.meta.addTag({name: 'og:image:alt', property: 'og:image:alt',  content: content.title}); //
    this.meta.addTag({name: 'og:updated_time', property: content.image, content: content.updated_time}); // 
    this.meta.addTag({name: 'og:url', content: content.url});
    this.meta.addTag({name: 'og:author', content: 'Antony Alika'});

  }


}
