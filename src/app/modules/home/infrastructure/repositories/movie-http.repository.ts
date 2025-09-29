import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MovieRepository } from "../../domain/repositories/movie.repository";
import type { Movie } from "../../domain/entities/movie.entity";
import type { MovieResponseDto } from "../dtos/movie-response.dto";
import { MovieMapper } from "../mappers/movie.mapper";
import { map, delay, Observable, forkJoin } from "rxjs";
import { MoviesAdapter } from "../adapters/http/movies.adapter";
import { GetGenresUseCase } from "../../application/use-cases/get-genres.use-case";
import { Popular } from "../../domain/entities/popular-movie.entity";
import { PopularMovieResponseDto } from "../dtos/popular-movies-response.dto";
import { PopularMovieMapper } from "../mappers/popular-movie.mapper";
import { TopRatedMovieResponseDto } from "../dtos/top-movie-response.dto";
import { TopRatedMovieMapper } from "../mappers/top-movie.mapper";
import { TopRatedMovie } from "../../domain/entities/top-movie.entity";
import { Upcoming } from "../../domain/entities/upcoming.entity";
import { UpcomingResponseDto } from "../dtos/upcoming-response.dto";
import { UpcomingMapper } from "../mappers/upcoming.mapper";

@Injectable()
export class MovieHttpRepository extends MovieRepository {
  private http = inject(HttpClient);
  private httpAdapter = inject(MoviesAdapter);
  private getGenresUseCase = inject(GetGenresUseCase);

  override getNowPlaying(options?: Record<string, unknown>): Observable<Movie[]> {
    if (options) this.httpAdapter.params = options;
    const enpoint = `${this.httpAdapter.apiUrl}/now_playing`;

    return forkJoin(
      this.getGenresUseCase.execute(), // Observable #1: Obtiene todos los géneros
      this.http.get<MovieResponseDto>(enpoint, { params: this.httpAdapter.params }) // Observable #2: Obtiene las películas
    ).pipe(
      delay(500),
      // 5. El 'map' ahora recibe un array con los resultados de los dos observables: [allGenres, movieResponse]
      map(([allGenres, movieResponse]) => {
        // 6. Ahora simplemente mapeas los resultados de las películas
        //    y pasas la lista de géneros a tu método estático.
        return movieResponse.results.map(movieDto =>
          MovieMapper.fromDto(movieDto, allGenres)
        );
      })
    );    
  }

  override getPopular(options?: Record<string, unknown>): Observable<Popular[]> {
    if (options) this.httpAdapter.params = options;
    const enpoint = `${this.httpAdapter.apiUrl}/popular`;

    return forkJoin(
      this.getGenresUseCase.execute(),
      this.http.get<PopularMovieResponseDto>(enpoint, { params: this.httpAdapter.params })
    ).pipe(
      delay(500),
      map(([allGenres, popularMovieResponse]) => {
        return popularMovieResponse.results.map(popularMovieDto =>
          PopularMovieMapper.fromDto(popularMovieDto, allGenres)
        );
      })
    );    
  }

  override getTopRated(options?: Record<string, unknown>): Observable<TopRatedMovie[]> {
    if (options) this.httpAdapter.params = options;
    const enpoint = `${this.httpAdapter.apiUrl}/top_rated`;

    return forkJoin(
      this.getGenresUseCase.execute(),
      this.http.get<TopRatedMovieResponseDto>(enpoint, { params: this.httpAdapter.params })
    ).pipe(
      delay(500),
      map(([allGenres, TopRatedMovieResponse]) => {
        return TopRatedMovieResponse.results.map(TopMovieDto =>
          TopRatedMovieMapper.fromDto(TopMovieDto, allGenres)
        );
      })
    );    
  }

  override getUpcoming(options?: Record<string, unknown>): Observable<Upcoming[]> {
    if (options) this.httpAdapter.params = options;
    const enpoint = `${this.httpAdapter.apiUrl}/upcoming`;

    return forkJoin(
      this.getGenresUseCase.execute(),
      this.http.get<UpcomingResponseDto>(enpoint, { params: this.httpAdapter.params })
    ).pipe(
      delay(500),
      map(([allGenres, movieResponse]) => {
        return movieResponse.results.map(movieDto =>
          UpcomingMapper.fromDto(movieDto, allGenres)
        );
      })
    );
  }
}


