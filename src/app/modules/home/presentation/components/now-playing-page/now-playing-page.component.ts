import { Component, OnInit, inject, signal } from "@angular/core";
import { NowPlayingFacade } from "../../../application/facades/now-playing.facade";
import { MediaCardComponent } from "../../../../../shared/ui/media-card/media-card.component";


@Component({
  selector: 'now-playing-page',
  imports: [MediaCardComponent],
  templateUrl: './now-playing-page.component.html',
  styleUrl: './now-playing-page.component.scss'
})
export class NowPlayingPageComponent implements OnInit {
  public readonly facade = inject(NowPlayingFacade);
  title = signal<string>('En cartelera');

  ngOnInit(): void {
    this.facade.loadNowPlaying();
  }
}