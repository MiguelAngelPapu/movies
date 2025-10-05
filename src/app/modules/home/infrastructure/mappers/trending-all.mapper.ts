import { Injectable } from '@angular/core';
import { TrendingAllDto } from '../dtos/trending-all-response.dto';
import { TrendingAll } from '../../domain/entities/trending-all.entity';


@Injectable({ providedIn: 'root' })
export class TrendingAllMapper {

    static fromDtoToEntity(dto: TrendingAllDto): TrendingAll {

        let title: string | undefined;

        if (dto.media_type === 'movie') {
            // para películas → title → original_title
            title = dto.title || dto.original_title || undefined;
        } else if (dto.media_type === 'tv') {
            // para series → name → original_name
            title = dto.name || dto.original_name || undefined;
        } else {
            // fallback genérico
            title = dto.title || dto.name || dto.original_title || dto.original_name || undefined;
        }


        return {
            id: dto.id,
            title,
            overview: (dto.overview) ? dto.overview : undefined,
            posterUrl: (dto.poster_path) ? `https://image.tmdb.org/t/p/w154${dto.poster_path}` : undefined,
            bannerUrl: (dto.backdrop_path) ? `https://image.tmdb.org/t/p/original${dto.backdrop_path}` : undefined,
            type: dto.media_type
        }
    }

}