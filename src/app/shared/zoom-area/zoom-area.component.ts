import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { StateChange } from 'ng-lazyload-image';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ResizeService } from 'src/app/services/resize.service';

@Component({
  selector: 'app-zoom-area',
  templateUrl: './zoom-area.component.html',
  styleUrls: ['./zoom-area.component.scss'],
})
export class ZoomAreaComponent implements OnInit {
  @ViewChild('elArea') elArea: ElementRef<HTMLDivElement>;
  @ViewChild('elImg') elImg: ElementRef<HTMLImageElement>;
  @ViewChild('elLens') elLens: ElementRef<HTMLDivElement>;
  @ViewChild('elImgZoomed') elImgZoomed: ElementRef<HTMLImageElement>;

  @Input() img: string;

  lensWidth: number;
  lensHeight: number;

  destroy$ = new Subject<void>();
  constructor(
    private zone: NgZone,
    private renderer: Renderer2,
    private resizeService: ResizeService
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Mouse hover move event
      fromEvent(this.elArea.nativeElement, 'mousemove')
        .pipe(takeUntil(this.destroy$))
        .subscribe(({ offsetX, offsetY }: MouseEvent) => {
          // Just in case it fires too fast
          if (!this.lensWidth || !this.lensHeight) return;

          const imgHeight = this.elImg.nativeElement.offsetHeight;
          const imgWidth = this.elImg.nativeElement.offsetWidth;
          // Img contain padding (the gray background area)
          const imgLeft = this.elImg.nativeElement.offsetLeft;
          const imgTop = this.elImg.nativeElement.offsetTop;

          // The area is larger than the actual img (depending on dimensions)
          // so it has to be contained, also center the lens on the cursor
          const XPos = Math.min(
            Math.max(offsetX - this.lensWidth / 2, imgLeft),
            imgLeft + imgWidth - this.lensWidth
          );
          const YPos = Math.min(
            Math.max(offsetY - this.lensHeight / 2, imgTop),
            imgTop + imgHeight - this.lensHeight
          );

          this.renderer.setStyle(
            this.elLens.nativeElement,
            'transform',
            `translate3d(${XPos}px,${YPos}px,0)`
          );

          // Set the dimensions for the zoomed img coordinates
          const XPosZoomed =
            ((XPos - imgLeft) / (imgWidth - this.lensWidth)) * 100 || 0;
          const YPosZoomed =
            ((YPos - imgTop) / (imgHeight - this.lensHeight)) * 100 || 0;
          // If it has hiccups
          // play with translate and overflow hidden
          this.renderer.setStyle(
            this.elImgZoomed.nativeElement,
            'background-position',
            `${XPosZoomed}% ${YPosZoomed}%`
          );
        });

      // Hover zoom toggle events
      fromEvent(this.elArea.nativeElement, 'mouseenter')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.displayLens(true);
          this.displayZoomed(true);
        });
      fromEvent(this.elArea.nativeElement, 'mouseleave')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.displayLens(false);
          this.displayZoomed(false);
        });

      // Update the lens dimensions on window resize
      this.resizeService.onResize$
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.resizeLens();
        });
    });
  }

  displayLens(val: boolean) {
    this.renderer.setStyle(
      this.elLens.nativeElement,
      'opacity',
      val ? '1' : '0'
    );
  }

  displayZoomed(val: boolean) {
    this.renderer.setStyle(
      this.elImgZoomed.nativeElement,
      'visibility',
      val ? 'visible' : 'hidden'
    );
  }

  resizeLens() {
    // Update the lens dimensions

    // Divide the zoomed img (element) width
    // with the zoomed img (real) width
    // then multiply with the small img (element) width
    this.renderer.removeStyle(this.elImgZoomed.nativeElement, 'height');

    let lensWidthRatio = Math.min(
      this.elImgZoomed.nativeElement.offsetWidth /
        this.elImg.nativeElement.naturalWidth,
      0.8
    );
    this.lensWidth = Number(
      (lensWidthRatio * this.elImg.nativeElement.offsetWidth).toFixed(2)
    );

    // Binding variables outside angular with observers is a hassle so set with renderer
    this.renderer.setStyle(
      this.elLens.nativeElement,
      'width',
      `${this.lensWidth}px`
    );

    let lensHeightRatio = Math.min(
      this.elImgZoomed.nativeElement.offsetHeight /
        this.elImg.nativeElement.naturalHeight,
      (lensWidthRatio /
        (this.elImgZoomed.nativeElement.offsetWidth /
          this.elImgZoomed.nativeElement.offsetHeight)) *
        (this.elImg.nativeElement.naturalWidth /
          this.elImg.nativeElement.naturalHeight),
      1
    );

    if (
      this.elImg.nativeElement.naturalWidth /
        this.elImg.nativeElement.naturalHeight >
      this.elImgZoomed.nativeElement.offsetWidth /
        this.elImgZoomed.nativeElement.offsetHeight
    ) {
      this.renderer.setStyle(
        this.elImgZoomed.nativeElement,
        'height',
        `${
          this.elImgZoomed.nativeElement.offsetWidth /
          (this.elImg.nativeElement.naturalWidth /
            this.elImg.nativeElement.naturalHeight)
        }px`
      );

      lensHeightRatio = 1;
    }

    this.lensHeight = Number(
      (lensHeightRatio * this.elImg.nativeElement.offsetHeight).toFixed(2)
    );

    this.renderer.setStyle(
      this.elLens.nativeElement,
      'height',
      `${this.lensHeight}px`
    );

    const zoomedImgWidth =
      this.elImgZoomed.nativeElement.offsetWidth / lensWidthRatio;
    const zoomedImgHeight =
      this.elImgZoomed.nativeElement.offsetHeight / lensHeightRatio;
    this.renderer.setStyle(
      this.elImgZoomed.nativeElement,
      'background-size',
      `${zoomedImgWidth}px ${zoomedImgHeight}px`
    );
  }

  imgStateChange(state: StateChange) {
    // Lazyload state change lens resize after img is loaded
    if (state.reason !== 'loading-succeeded') return;
    this.resizeLens();
  }
}
