import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GetGenresUseCase } from '../use-cases/get-genres.use-case';
import { Genre } from '../../domain/entities/genre.entity';

@Injectable({
  providedIn: 'root'
})
export class GenresFacade{

  private getGenresUseCase = inject(GetGenresUseCase);

  private genres = signal<Genre[]>([]);
  private loading = signal(false);

  readonly genres$ = this.genres.asReadonly();
  readonly loading$ = this.loading.asReadonly();

  async loadGenres() {
    this.loading.set(true);

    try {

      const data = await firstValueFrom(this.getGenresUseCase.execute());
      if (Array.isArray(data)) {
  
        this.genres.update(prev => [...prev, ...data]);


      } else {

        console.error('Error controlado al cargar películas:', data);
        this.genres.set([]);

      }
    } catch (error) {
      
      console.error('Error no controlado en el PopularMoviesFacade', error);
      this.genres.set([]);

    } finally {
      this.loading.set(false);
    }
  }

  refreshGenres() {
    this.loadGenres();
  }

  get hasGenres() {
    return this.genres().length > 0;
  }
}
