import { Directive, ElementRef, EventEmitter, HostListener, input, Input, Output } from '@angular/core';

@Directive({
  selector: '[infiniteScrollX]',
  standalone: true
})
export class InfiniteScrollDirective {
  loadThreshold = input<number>(90);
  @Output() nearEnd = new EventEmitter<void>();

  private prevScrollPercent = 0;

  constructor(private el: ElementRef<HTMLDivElement>) {}

  @HostListener('scroll', ['$event'])
  onScroll(event: Event) {
    const target = event.target as HTMLDivElement;
    const { scrollLeft, scrollWidth, clientWidth } = target;
    const porcentaje = ((scrollLeft + clientWidth) / scrollWidth) * 100;

    if (this.prevScrollPercent < this.loadThreshold() && porcentaje >= this.loadThreshold()) {
      this.nearEnd.emit();
    }

    this.prevScrollPercent = porcentaje;
  }
}
