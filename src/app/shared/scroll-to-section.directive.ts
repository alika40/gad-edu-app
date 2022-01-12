import { Directive, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';



@Directive({
  selector: '[appScrollToSection]'
})
export class ScrollToSectionDirective {


  constructor(private router: Router, private el: ElementRef) {  this.scrollToSectionHook(); }

  private scrollToSectionHook(): void {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            const tree = this.router.parseUrl(this.router.url);
            if (tree.fragment) {
                const element = this.el.nativeElement;
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
                    }, 1000 );
                }
            }
        }
      })
  }


}
