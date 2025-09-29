import { Component, input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { OnlyNamesGenrePipe } from '../../pipes/only-names-genre.pipe';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { TruncateNumberPipe } from '../../pipes/truncate-number.pipe';
import { MediaItem } from '../../models/media.type';
import { Series } from '../../../modules/home/domain/entities/series.entity';
import { TopRatedSeries } from '../../../modules/home/domain/entities/top-series.entity';



@Component({
  selector: 'media-card',
  imports: [CommonModule, OnlyNamesGenrePipe, SafeHtmlPipe, TruncateNumberPipe],
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.scss'
})
export class MediaCardComponent {
  data = input<MediaItem>(undefined);

  isSerie(item: MediaItem): Series | undefined {
    return (!!item && 'season' in item) ? item as Series : undefined;
  }
  isTopSerie(item: MediaItem): TopRatedSeries | undefined {
    return (!!item && 'numberOfSeasons' in item) ? item as TopRatedSeries : undefined;
  }

}