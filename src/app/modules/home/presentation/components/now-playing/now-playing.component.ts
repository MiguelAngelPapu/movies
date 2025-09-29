import { Component, inject, OnInit, signal } from '@angular/core';
import { NowPlayingFacade } from '../../../application/facades/now-playing.facade';
import { HorizontalCardCarouselComponent } from "../../../../../shared/ui/horizontal-card-carousel/horizontal-card-carousel.component";

@Component({
  selector: 'now-playing',
  imports: [HorizontalCardCarouselComponent],
  templateUrl: './now-playing.component.html',
  styleUrl: './now-playing.component.scss'
})
export class NowPlayingComponent implements OnInit {
  public readonly facade = inject(NowPlayingFacade);
  
  title = signal<string>('Cartelera');
  router = signal<string>('/now-playing');

  ngOnInit(): void {
    this.facade.loadNowPlaying();
  }

}
