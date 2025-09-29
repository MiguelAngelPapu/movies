

import { PopularMovieDto } from "../dtos/popular-movies-response.dto";
import { Popular } from "../../domain/entities/popular-movie.entity";
import { Genre } from "../../domain/entities/genre.entity";

export class PopularMovieMapper {

  static fromDto(dto: PopularMovieDto, allGenres: Genre[]): Popular {

    const movieGenres: Genre[] = dto.genre_ids
    .map(id => allGenres.find(genre => genre.id === id))
    .filter((genre): genre is Genre => genre !== undefined);

    return {
      id: dto.id,
      title: dto.title,
      overview: dto.overview,
      releaseDate: new Date(dto.release_date),
      posterUrl: (dto.poster_path) ? `https://image.tmdb.org/t/p/w500${dto.poster_path}`: undefined,
      rating: (dto.popularity) ? dto.popularity : undefined,
      genres: (movieGenres.length) ? movieGenres : undefined
    }

  }

}