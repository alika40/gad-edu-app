import { Component, OnInit, OnDestroy,
        ViewChild, ElementRef,
        Renderer2, AfterViewInit,
        ChangeDetectionStrategy, 
        Input} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/courses.model';

@Component({
  selector: 'app-other-courses',
  templateUrl: './other-courses.component.html',
  styleUrls: ['./other-courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtherCoursesComponent implements OnInit, AfterViewInit, OnDestroy {

  
  courses: Course[] = [];
  private _otherCourses: Course[] = [];


  @ViewChild('navButton') private navButton: ElementRef<HTMLElement> | any;
  @ViewChild('carousel') private carouselContainer: ElementRef<HTMLElement> | any;
  private subs: Subscription = new Subscription();
  private currentCardIndex = 0;
  private cardWidth = 0;
  private cardMarginLeft = 0;
  public showMoreOrLess = 50;
  private toggleLockFlag = false;
  private breakPointState: boolean | undefined;
  private touchStart = 0;
  private triggerMousedown = true;

  @Input()
  get otherCourses(): Course[] {
    return this._otherCourses;
  }
  set otherCourses(courses: Course[]) {
    this._otherCourses = courses;
    this.getCourses(this.otherCourses);
  }



  constructor(  private renderer2: Renderer2,
                private breakpointObserver: BreakpointObserver ) {}

  ngOnInit(): void { }


  
  private getCourses(courses: Course[]): void {
    this.courses = courses;
  }

  

  ngAfterViewInit(): void {

    if (this.courses.length) {
      
      const cardContainer = this.carouselContainer.nativeElement;
      const currentElem = this.navButton.nativeElement;

      this.subs.add(
                    this.breakpointObserver
                    .observe(['(max-width: 768px)'])
                    .subscribe((state: BreakpointState) => {
                        if (state.matches) {
                          this.breakPointState = state.matches;
                          this.initializeNav(currentElem, cardContainer, this.breakPointState);
                          this.onTouchStart(cardContainer);
                          this.onTouchMove(currentElem, cardContainer);
                        } else {
                          this.breakPointState = state.matches;
                          this.initializeNav(currentElem, cardContainer, this.breakPointState);
                      }
                    })
      );

      this.onPrevious(currentElem, cardContainer);
      this.onNext(currentElem, cardContainer);
      this.arrowKeyNav(currentElem, cardContainer);
      this.onMouseDown(cardContainer);
      this.onMouseMove(currentElem, cardContainer);
    }


  }




// Initial Start up when this component is first navigate to
  initializeNav(currentElem: HTMLElement, cardContainer: HTMLElement | any, breakPointtate: boolean): void {

    let cardStyle: CSSStyleDeclaration;
    const nextElem = this.renderer2.nextSibling(currentElem);
    this.cardWidth = cardContainer.firstElementChild.clientWidth;
    const lastCard = cardContainer.lastElementChild;

    cardStyle = getComputedStyle(lastCard); // .card {margin-left: 5px }
    const num: any = cardStyle ? cardStyle.marginLeft.match(/([0-9]+)/) : 5 + 'px';
    this.cardMarginLeft = +num[0];

    if (breakPointtate) { // Moble: Always hide onNext button
        this.renderer2.setAttribute(nextElem, 'hidden', 'true');
        this.renderer2.setAttribute(currentElem, 'hidden', 'true');
    } else { // Non Mobile: Hide onPrevious button when index === 0
      this.renderer2.removeAttribute(nextElem, 'hidden');
      this.renderer2.setAttribute(currentElem, 'hidden', 'true');
    }

    const lock = this.lockNav(cardContainer);
    if (lock) {
      this.renderer2.setAttribute(nextElem, 'hidden', 'true');
      const cards = cardContainer.childNodes;
      const newContainerParentWidth = (cards.length - 1) * this.cardWidth; // cards.length Adjustable
      // cardContainer.parentElement.style.width = newContainerParentWidth + 'px';
      const parentElem = this.renderer2.parentNode(cardContainer);
      this.renderer2.setStyle(parentElem, 'width', newContainerParentWidth + 'px');
      this.triggerMousedown = false;
    }
  }



  lockNav(cardContainer: HTMLElement | any ): boolean { // Disable btns/action when parent...
    const cards = cardContainer.childNodes; // ...container is smaller than items left
    const cardsReminder = (cards.length - this.currentCardIndex) * this.cardWidth;
    const containerParent = cardContainer.parentElement.clientWidth;
    return (containerParent >= cardsReminder);
  }



  onPreviousHelperFn(currentElem: HTMLElement, cardContainer: HTMLElement): void {
    if ( this.currentCardIndex > 0) {

      const nextElem = this.renderer2.nextSibling(currentElem);

      if (this.breakPointState) { // Moble: Always hide onNext button
          this.renderer2.setAttribute(nextElem, 'hidden', 'true');
      } else {
              this.renderer2.removeAttribute(nextElem, 'hidden'); // Show onNext button when index < 0
              // this.renderer2.setStyle(nextElem, 'background-color', 'green');
      }

      // this.renderer2.removeAttribute(nextElem, 'hidden'); // Show onPrevious button when index > 0
      this.currentCardIndex--;

      const containerWidthOffset = this.cardWidth * this.currentCardIndex;
      const cardMarginLeftOffset = this.currentCardIndex * this.cardMarginLeft;
      const currentLeftPos = containerWidthOffset + cardMarginLeftOffset;
      cardContainer.style.marginLeft = -currentLeftPos + 'px';

    } else { // Hide onNext button when index === 0
      this.renderer2.setAttribute(currentElem, 'hidden', 'true');
    }


  }



  onNextHelperFn(currentElem: HTMLElement, cardContainer: HTMLElement): void {

    const nextElem = this.renderer2.nextSibling(currentElem);
    const cards = cardContainer.childNodes;

    if ( this.currentCardIndex < cards.length ) {

      if (this.breakPointState) { // Moble: Always hide onPrevious button
          this.renderer2.setAttribute(currentElem, 'hidden', 'true');
      } else {
        this.renderer2.removeAttribute(currentElem, 'hidden'); // Show onPrevious button when index < 0
        // this.renderer2.setStyle(currentElem, 'background-color', 'red');
      }
      this.currentCardIndex++;

      const containerWidthOffset = this.cardWidth * this.currentCardIndex;
      const cardMarginLeftOffset = this.currentCardIndex * this.cardMarginLeft;
      const currentLeftPos = containerWidthOffset + cardMarginLeftOffset;
      cardContainer.style.marginLeft = -currentLeftPos + 'px';

      const lock = this.lockNav(cardContainer);
      if (lock) { // Hide onNext button
          this.renderer2.setAttribute(nextElem, 'hidden', 'true');
      }
    }

  }




// For Device with wider screen Section: Screen size above 768px
  onPrevious(currentElem: HTMLElement, cardContainer: HTMLElement): void {

    this.renderer2.listen(currentElem, 'click', () => {

      this.onPreviousHelperFn(currentElem, cardContainer);

    });
  }



  onNext(currentElem: HTMLElement, cardContainer: HTMLElement): void {

    const nextElem = this.renderer2.nextSibling(currentElem);

    this.renderer2.listen(nextElem, 'click', () => {

      this.onNextHelperFn(currentElem, cardContainer);

    });
  }



  arrowKeyNav(currentElem: HTMLElement, cardContainer: HTMLElement): void {
    // Add tabindex="0" to the targeted element in the template to make Event work
    this.renderer2.listen(cardContainer, 'keydown', (e) => {
      const code = e.which || e.keyCode;

      if ( e && code === 37 ) {
          this.onPreviousHelperFn(currentElem, cardContainer);
      }

      const lock = this.lockNav(cardContainer);
      if ( e && code === 39 && !lock ) {
          this.onNextHelperFn(currentElem, cardContainer);
        }
    });
  }



  onMouseDown(cardContainer: HTMLElement): void {
    if (this.triggerMousedown) {
        this.renderer2.listen(cardContainer, 'mousedown', (e) => {
          // e.preventDefault();
          this.toggleLockFlag = true;
        });
    }
  }



  onMouseMove(currentElem: HTMLElement, cardContainer: HTMLElement): void {
    this.renderer2.listen(cardContainer, 'mousemove', (e) => {

      if (e && this.toggleLockFlag ) {
        if (e.movementX < 0) {
          // console.log('left', e);
          const lock = this.lockNav(cardContainer);
          if (!lock ) { this.onNextHelperFn(currentElem, cardContainer); }
        }
        if (e.movementX > 0) {
          // console.log('right', e);
          this.onPreviousHelperFn(currentElem, cardContainer);
        }
        this.toggleLockFlag = false;
      }
    });
  }




// For Touchsreen Mobile Phones Section: Screen size below 768px
  onTouchStart(cardContainer: HTMLElement): void {
      this.renderer2.listen(cardContainer, 'touchstart', (e) => {
          e.preventDefault();
          this.toggleLockFlag = true;
          this.touchStart = e.touches[0].clientX;
      });
  }



  onTouchMove(currentElem: HTMLElement, cardContainer: HTMLElement): void {  // Touchscreen
    this.renderer2.listen(cardContainer, 'touchmove', (e) => {

      e.preventDefault();
      const moveDirection = Math.round(e.touches[0].clientX - this.touchStart);

      if (e.touches && this.toggleLockFlag ) {
        if (moveDirection >= 0) {
          // alert('Swipe Right');
          this.onPreviousHelperFn(currentElem, cardContainer);
        }
        if (moveDirection < 0) {
          // alert('Swipe Left');
          const lock = this.lockNav(cardContainer);
          if (!lock ) { this.onNextHelperFn(currentElem, cardContainer); }
        }
        this.toggleLockFlag = false;
      }
    });
  }



  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }


}
