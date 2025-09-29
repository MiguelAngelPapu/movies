import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[dragScroll]',
  standalone: true
})
export class DragScrollDirective {
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;

  constructor(private el: ElementRef<HTMLDivElement>) { }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDown = true;
    const carousel = this.el.nativeElement;
    carousel.classList.add('active');
    this.startX = event.pageX - carousel.offsetLeft;
    this.scrollLeft = carousel.scrollLeft;
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isDown = false;
    this.el.nativeElement.classList.remove('active');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isDown = false;
    this.el.nativeElement.classList.remove('active');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDown) return;
    event.preventDefault();
    const carousel = this.el.nativeElement;
    const x = event.pageX - carousel.offsetLeft;
    const walk = (x - this.startX) * 1;
    carousel.scrollLeft = this.scrollLeft - walk;
  }
}