import { Component, computed, effect, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { ActionButtonComponent } from '../../../../../shared/ui/action-button/action-button.component';
import { TrendingAllFacade } from '../../../application/facades/trending-all.facade';

@Component({
  selector: 'hero-carousel',
  imports: [ActionButtonComponent],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss'
})
export class HeroCarouselComponent implements OnInit {
  public readonly facade = inject(TrendingAllFacade);
  @Output() banner = new EventEmitter<string>();

  thumbnailErrorLeft = signal<boolean>(false);
  thumbnailErrorRight = signal<boolean>(false);

  constructor() {
    effect(() => {
      const currents = this.facade.currentInternalItems;
      if (currents.length) this.banner.emit(currents[0].bannerUrl)
    });
  }

  ngOnInit(): void {
    this.facade.loadTrending();
  }


}