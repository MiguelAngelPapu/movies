import { MovieDto } from "../dtos/movie-response.dto";
import { Movie } from "../../domain/entities/movie.entity";
import { Genre } from "../../domain/entities/genre.entity";

export class MovieMapper {

  static fromDto(dto: MovieDto, allGenres: Genre[]): Movie {

    const movieGenres: Genre[] = dto.genre_ids
    .map(id => allGenres.find(genre => genre.id === id))
    .filter((genre): genre is Genre => genre !== undefined);

    return {
      id: dto.id,
      title: dto.title,
      overview: dto.overview,
      releaseDate: new Date(dto.release_date),
      posterUrl: (dto.poster_path) ? `https://image.tmdb.org/t/p/w500${dto.poster_path}`: undefined,
      rating: (dto.vote_average) ? dto.vote_average : undefined,
      genres: (movieGenres.length) ? movieGenres : undefined
    }

  }

}