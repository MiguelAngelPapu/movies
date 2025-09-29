import { Observable } from "rxjs";
import type { Movie } from "../entities/movie.entity";
import { Popular } from "../entities/popular-movie.entity";
import { TopRatedMovie } from "../entities/top-movie.entity";
import { Upcoming } from "../entities/upcoming.entity";


export abstract class MovieRepository {
  abstract getNowPlaying(options?: Record<string, unknown>): Observable<Movie[]>;
  abstract getPopular(options?: Record<string, unknown>): Observable<Popular[]>;
  abstract getTopRated(options?: Record<string, unknown>): Observable<TopRatedMovie[]>;
  abstract getUpcoming(options?: Record<string, unknown>): Observable<Upcoming[]>;
}