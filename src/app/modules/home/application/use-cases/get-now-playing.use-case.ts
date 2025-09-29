import { inject, Injectable } from "@angular/core";
import { MovieRepository } from "../../domain/repositories/movie.repository";
import { Movie } from "../../domain/entities/movie.entity";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GetNowPlayingUseCase {
  private repository = inject(MovieRepository);

  execute(params?: Record<string, any>): Observable<Movie[]> {
    return this.repository.getNowPlaying(params);
  }
}
