import { Component, Input } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn, fadeOut } from './carousel.animations';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        useAnimation(fadeIn, { params: { time: '1300ms' } }),
      ]),
      transition('* => void', [
        useAnimation(fadeOut, { params: { time: '1300ms' } }),
      ]),
    ]),
  ],
})
export class CarouselComponent {
  @Input() content!: any[];

  currentSlide = 0;

  constructor() {}

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.content.length - 1 : previous;
    console.log('Previous clicked, new current slide is: ', this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.content.length ? 0 : next;
    console.log('Next clicked, new current slide is: ', this.currentSlide);
  }
}
