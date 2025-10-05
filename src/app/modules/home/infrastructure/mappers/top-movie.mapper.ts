
import { Genre } from "../../domain/entities/genre.entity";
import { TopRatedMovie } from "../../domain/entities/top-movie.entity";
import { TopRatedMovieDto } from "../dtos/top-movie-response.dto";

export class TopRatedMovieMapper {

  static fromDto(dto: TopRatedMovieDto, allGenres: Genre[]): TopRatedMovie {

    const movieGenres: Genre[] = dto.genre_ids
    .map(id => allGenres.find(genre => genre.id === id))
    .filter((genre): genre is Genre => genre !== undefined);

    return {
      id: dto.id,
      title: dto.title,
      overview: dto.overview,
      releaseDate: new Date(dto.release_date),
      posterUrl: (dto.poster_path) ? `https://image.tmdb.org/t/p/w342${dto.poster_path}`: undefined,
      rating: (dto.vote_average) ? dto.vote_average : undefined,
      genres: (movieGenres.length) ? movieGenres : undefined
    }

  }

}