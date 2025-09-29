
import { Genre } from "../../domain/entities/genre.entity";
import { TopRatedSeries } from "../../domain/entities/top-series.entity";
import { TopRatedSeriesDto } from "../dtos/top-series-response.dto";

export class TopRatedSeriesMapper {

  static fromDto(dto: TopRatedSeriesDto, allGenres: Genre[]): TopRatedSeries {

    const movieGenres: Genre[] = dto.genre_ids
    .map(id => allGenres.find(genre => genre.id === id))
    .filter((genre): genre is Genre => genre !== undefined);

    return {
      id: dto.id,
      title: dto.name,
      overview: dto.overview,
      releaseDate: new Date(dto.first_air_date),
      posterUrl: (dto.poster_path) ? `https://image.tmdb.org/t/p/w500${dto.poster_path}`: undefined,
      rating: (dto.vote_average) ? dto.vote_average : undefined,
      genres: (movieGenres.length) ? movieGenres : undefined,
      numberOfSeasons: undefined
    }

  }

}