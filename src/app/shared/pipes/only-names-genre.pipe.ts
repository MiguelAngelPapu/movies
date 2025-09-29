import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../../modules/home/domain/entities/genre.entity';

@Pipe({
  name: 'onlyNamesGenrePipe'
})
export class OnlyNamesGenrePipe implements PipeTransform {

  transform(value:Genre[]): string {
    if (!value || value.length === 0) return '';
    return value.map(item => item.name).join(' <span class="media-card__genre-tag--separator">&nbsp;</span> ');
  }

}