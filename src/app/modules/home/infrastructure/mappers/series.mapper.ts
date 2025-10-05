import { Season, Series } from "../../domain/entities/series.entity";
import { SeasonResponseDto, SeriesResponseDto } from "../dtos/series-response.dto";


export class SeriesMapper {

  static fromDto(dto: SeriesResponseDto): Series {

    let { seasons } = dto;

    return {
      id: dto.id,
      title: dto.name,
      overview: dto.overview,
      releaseDate: new Date(dto.first_air_date),
      posterUrl: (dto.poster_path) ? `https://image.tmdb.org/t/p/w280${dto.poster_path}` : undefined,
      rating: (dto.vote_average) ? dto.vote_average : undefined,
      genres: (dto.genres.length) ? dto.genres : undefined,
      season: SeriesMapper.mapSeasons(seasons),
      numberOfSeasons: dto.number_of_seasons
    }

  }

  private static mapSeasons(seasons: SeasonResponseDto[]): Season[] {

    return seasons.map(season => ({
      airDate: new Date(season.air_date),
      episodeCount: season.episode_count,
      id: season.id,
      name: season.name,
      overview: season.overview,
      posterUrl: season.poster_path 
        ? `https://image.tmdb.org/t/p/w342${season.poster_path}` 
        : undefined,
      seasonNumber: season.season_number,
      rating: season.vote_average || undefined
    }));
    
  }

}