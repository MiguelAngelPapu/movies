import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GetTopRatedMovieUseCase } from '../use-cases/get-top-movie.use-case';
import { TopRatedMovie } from '../../domain/entities/top-movie.entity';

@Injectable({
  providedIn: 'root'
})
export class TopRatedMoviesFacade{

  private getTopRatedMovieUseCase = inject(GetTopRatedMovieUseCase);

  private movie = signal<TopRatedMovie[]>([]);
  private loading = signal(false);
  private currentPage = 1;

  readonly movies$ = this.movie.asReadonly();
  readonly loading$ = this.loading.asReadonly();

  async loadTopMovies(page: number = 1) {
    this.loading.set(true);

    try {

      const data = await firstValueFrom(this.getTopRatedMovieUseCase.execute({ page }));
      if (Array.isArray(data)) {
        if (page === 1) this.movie.set(data);
        else this.movie.update(prev => [...prev, ...data]);
        this.currentPage = page;

      } else {

        console.error('Error controlado al cargar películas:', data);
        if (page === 1) this.movie.set([]);

      }
    } catch (error) {
      
      console.error('Error no controlado en el PopularMoviesFacade', error);
      if (page === 1) this.movie.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  refreshTopMovies() {
    this.loadTopMovies(1);
  }

  loadNextPage() {
    this.loadTopMovies(this.currentPage + 1);
  }

  get hasTopMovies() {
    return this.movie().length > 0;
  }
}
