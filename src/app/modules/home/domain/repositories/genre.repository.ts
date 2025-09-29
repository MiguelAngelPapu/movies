import { Observable } from 'rxjs';
import { Genre } from '../entities/genre.entity';


export abstract class GenreRepository {
  abstract getAll(options?: Record<string, unknown>): Observable<Genre[]>;
}