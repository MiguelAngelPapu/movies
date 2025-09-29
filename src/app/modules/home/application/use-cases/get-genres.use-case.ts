import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genre } from '../../domain/entities/genre.entity';
import { GenreRepository } from '../../domain/repositories/genre.repository';

@Injectable({ providedIn: 'root' })
export class GetGenresUseCase {
    private repository = inject(GenreRepository);

    execute(params?: Record<string, any>): Observable<Genre[]> {
        return this.repository.getAll();
    }
}