import { inject, Injectable, signal } from '@angular/core';
import { GetPopularMovieUseCase } from '../use-cases/get-popular-movie.use-case';
import { Popular } from '../../domain/entities/popular-movie.entity';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopularMoviesFacade{

  private getPopularMovieUseCase = inject(GetPopularMovieUseCase);

  private popular = signal<Popular[]>([]);
  private loading = signal(false);
  private currentPage = 1;

  readonly movies$ = this.popular.asReadonly();
  readonly loading$ = this.loading.asReadonly();

  async loadPopularMovies(page: number = 1) {
    this.loading.set(true);

    try {

      const data = await firstValueFrom(this.getPopularMovieUseCase.execute({ page }));
      if (Array.isArray(data)) {
        if (page === 1) this.popular.set(data);
        else this.popular.update(prev => [...prev, ...data]);
        this.currentPage = page;

      } else {

        console.error('Error controlado al cargar películas:', data);
        if (page === 1) this.popular.set([]);

      }
    } catch (error) {
      
      console.error('Error no controlado en el PopularMoviesFacade', error);
      if (page === 1) this.popular.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  refreshPopularMovies() {
    this.loadPopularMovies(1);
  }

  loadNextPage() {
    this.loadPopularMovies(this.currentPage + 1);
  }

  get hasPopularMovies() {
    return this.popular().length > 0;
  }
}
