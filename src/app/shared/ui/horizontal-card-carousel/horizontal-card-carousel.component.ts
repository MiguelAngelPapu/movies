import { Component, EventEmitter, input, model, Output, signal } from '@angular/core';
import { MediaCardComponent } from "../media-card/media-card.component";
import { MediaItem } from '../../models/media.type';
import { DragScrollDirective } from '../../directives/drag-scroll.directive.directive';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'horizontal-card-carousel',
  imports: [RouterLink, MediaCardComponent, DragScrollDirective, InfiniteScrollDirective, RouterLink],
  templateUrl: './horizontal-card-carousel.component.html',
  styleUrl: './horizontal-card-carousel.component.scss'
})
export class HorizontalCardCarouselComponent {
  @Output() loading = new EventEmitter<void>();
  router = input<string>('/');
  isLoadingSignal = model<boolean>(false);
  title = input<string>('');
  data = model<MediaItem[]>([]);
  hasData = input<boolean>(false);

}