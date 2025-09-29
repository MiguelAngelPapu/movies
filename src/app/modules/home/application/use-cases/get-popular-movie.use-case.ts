import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Popular } from '../../domain/entities/popular-movie.entity';
import { MovieRepository } from '../../domain/repositories/movie.repository';

@Injectable({ providedIn: 'root' })
export class GetPopularMovieUseCase {
    private repository = inject(MovieRepository);

    execute(params?: Record<string, any>): Observable<Popular[]> {
        return this.repository.getPopular(params)
    }
}