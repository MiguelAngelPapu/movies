import { Genre } from "../../domain/entities/genre.entity";
import { Upcoming } from "../../domain/entities/upcoming.entity";
import { UpcomingDto } from "../dtos/upcoming-response.dto";

export class UpcomingMapper {

  static fromDto(dto: UpcomingDto, allGenres: Genre[]): Upcoming {

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