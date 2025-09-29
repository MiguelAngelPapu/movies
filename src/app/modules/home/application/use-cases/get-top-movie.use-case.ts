import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopRatedMovie } from '../../domain/entities/top-movie.entity';
import { MovieRepository } from '../../domain/repositories/movie.repository';

@Injectable({ providedIn: 'root' })
export class GetTopRatedMovieUseCase {
    private repository = inject(MovieRepository);

    execute(params?: Record<string, any>): Observable<TopRatedMovie[]> {
        return this.repository.getTopRated(params)
    }
}