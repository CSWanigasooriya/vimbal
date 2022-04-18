import { Component } from '@angular/core';
import { inOutAnimation } from '../../core/animation/in-out.animation';

@Component({
  selector: 'vimbal-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  animations: [inOutAnimation],
})
export class ReviewComponent {}
