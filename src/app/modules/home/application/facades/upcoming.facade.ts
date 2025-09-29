import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GetUpcomingUseCase } from '../use-cases/get-upcoming.use-case';
import { Upcoming } from '../../domain/entities/upcoming.entity';


@Injectable({
  providedIn: 'root'
})
export class UpcomingFacade{

  private getUpcomingUseCase = inject(GetUpcomingUseCase);

  private movie = signal<Upcoming[]>([]);
  private loading = signal(false);
  private currentPage = 1;

  readonly movies$ = this.movie.asReadonly();
  readonly loading$ = this.loading.asReadonly();

  async loadUpcoming(page: number = 1) {
    this.loading.set(true);

    try {

      const data = await firstValueFrom(this.getUpcomingUseCase.execute({ page }));
      if (Array.isArray(data)) {
        if (page === 1) this.movie.set(data);
        else this.movie.update(prev => [...prev, ...data]);
        this.currentPage = page;

      } else {

        console.error('Error controlado al cargar películas:', data);
        if (page === 1) this.movie.set([]);

      }
    } catch (error) {
      
      console.error('Error no controlado en el UpcomingFacade', error);
      if (page === 1) this.movie.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  refreshUpcoming() {
    this.loadUpcoming(1);
  }

  loadNextPage() {
    this.loadUpcoming(this.currentPage + 1);
  }

  get hasUpcoming() {
    return this.movie().length > 0;
  }
}
