import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrolledTo]',
  exportAs: 'appScrolledTo',
})
export class ScrolledToDirective {
  reached = false;
  passed = false;

  constructor(public el: ElementRef) { }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) +
                (document.documentElement.offsetHeight);
    const max = document.documentElement.scrollHeight;
    if (pos === max )   {
        this.reached = true;
    } else { this.reached = false; }
  }
}

