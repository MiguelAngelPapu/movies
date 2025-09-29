import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Upcoming } from '../../domain/entities/upcoming.entity';
import { MovieRepository } from '../../domain/repositories/movie.repository';

@Injectable({ providedIn: 'root' })
export class GetUpcomingUseCase {
    private repository = inject(MovieRepository);

    execute(params?: Record<string, any>): Observable<Upcoming[]> {
        return this.repository.getUpcoming(params)
    }
}