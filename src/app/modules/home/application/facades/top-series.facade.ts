import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GetTopRatedSeriesUseCase } from '../use-cases/get-top-series.use-case';
import { TopRatedSeries } from '../../domain/entities/top-series.entity';

@Injectable({
  providedIn: 'root'
})
export class TopRatedSeriesFacade{

  private getTopRatedSeriesUseCase = inject(GetTopRatedSeriesUseCase);

  private series = signal<TopRatedSeries[]>([]);
  private loading = signal(false);
  private currentPage = 1;

  readonly series$ = this.series.asReadonly();
  readonly loading$ = this.loading.asReadonly();

  async loadTopSeries(page: number = 1) {
    this.loading.set(true);

    try {

      const data = await firstValueFrom(this.getTopRatedSeriesUseCase.execute({ page }));
      if (Array.isArray(data)) {
        if (page === 1) this.series.set(data);
        else this.series.update(prev => [...prev, ...data]);
        this.currentPage = page;

      } else {

        console.error('Error controlado al cargar las series:', data);
        if (page === 1) this.series.set([]);

      }
    } catch (error) {
      
      console.error('Error no controlado en el TopRatedSeriesFacade', error);
      if (page === 1) this.series.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  refreshTopSeries() {
    this.loadTopSeries(1);
  }

  loadNextPage() {
    this.loadTopSeries(this.currentPage + 1);
  }

  get hasTopSeries() {
    return this.series().length > 0;
  }
}
