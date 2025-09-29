import { Component, inject, OnInit, signal } from '@angular/core';
import { TopRatedSeriesFacade } from '../../../application/facades/top-series.facade';
import { HorizontalCardCarouselComponent } from "../../../../../shared/ui/horizontal-card-carousel/horizontal-card-carousel.component";

@Component({
  selector: 'top-series',
  imports: [HorizontalCardCarouselComponent],
  templateUrl: './top-series.component.html',
  styleUrl: './top-series.component.scss'
})
export class TopSeriesComponent implements OnInit {
  public readonly facade = inject(TopRatedSeriesFacade);
  
  title = signal<string>('Series mejor valoradas');
  router = signal<string>('/');

  ngOnInit(): void {
    this.facade.loadTopSeries();
  }
}