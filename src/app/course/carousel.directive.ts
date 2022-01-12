import { AfterViewInit, Directive, ElementRef, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCarousel]',
})
export class CarouselDirective {

  @Output() button: any; 


  constructor(private renderer2: Renderer2) { }


  onBTN(c: any): void {
    console.log(c);
  }

}
