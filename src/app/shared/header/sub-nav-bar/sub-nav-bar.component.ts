import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewEncapsulation,
  Injectable,
  Renderer2,
} from '@angular/core';
import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import * as hammer from 'hammerjs';

@Injectable()
export class SwipeHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_HORIZONTAL, treshold: 50 },
  };
}

@Component({
  selector: 'app-sub-nav-bar',
  templateUrl: './sub-nav-bar.component.html',
  styleUrls: ['./sub-nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: SwipeHammerConfig,
    },
  ],
})
export class SubNavBarComponent implements OnInit, AfterViewInit {
  @ViewChild('subNavbar') subNavbar: ElementRef<HTMLDivElement>;
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit(): void {}
  ngOnInit(): void {}

  onSwipe(ev: HammerInput & { overallVelocityX: number }) {
    this.subNavbar.nativeElement.scrollBy({
      behavior: 'smooth',
      left:
        1.5 *
        ev.deltaX *
        ev.overallVelocityX *
        (ev.direction === Hammer.DIRECTION_LEFT ? 1 : -1),
    });
  }
}
