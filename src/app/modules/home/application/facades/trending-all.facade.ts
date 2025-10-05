import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GetAllTrendingUseCase } from '../use-cases/get-all-trending.use-case';
import { TrendingAll } from '../../domain/entities/trending-all.entity';

@Injectable({
  providedIn: 'root'
})
export class TrendingAllFacade {
  private getAllTrendingUseCase = inject(GetAllTrendingUseCase);

  private trending = signal<TrendingAll[]>([]);
  private loading = signal(false);
  private allDataLoaded = signal(false); // 👈 Para saber si ya no hay más datos en la API

  private currentApiPage = 1;
  private internalPage = 0;
  private readonly internalSize = 3;

  readonly trending$ = this.trending.asReadonly();
  readonly loading$ = this.loading.asReadonly();

  async loadTrending(page: number = 1) {
    if (this.loading() || (page > 1 && this.allDataLoaded())) return; // Evita peticiones innecesarias

    this.loading.set(true);

    try {
      const data = await firstValueFrom(this.getAllTrendingUseCase.execute({ page }));

      if (Array.isArray(data)) {
        if (data.length === 0) {
          this.allDataLoaded.set(true); // Si la API no devuelve nada, asumimos que llegamos al final
        } else {
          if (page === 1) this.trending.set(data);
          else this.trending.update(prev => [...prev, ...data]);
          this.currentApiPage = page;
        }
      } else {
        console.error('Error controlado al cargar todos los trending:', data);
        if (page === 1) this.trending.set([]);
      }
    } catch (error) {
      console.error('Error no controlado en el TrendingAllFacade', error);
      if (page === 1) this.trending.set([]);
    } finally {
      this.loading.set(false);
    }
  }


  refreshTrending() {
    this.allDataLoaded.set(false);
    this.internalPage = 0;
    this.loadTrending(1);
  }


  private loadNextApiPage() {
    this.loadTrending(this.currentApiPage + 1);
  }

  // 👉 Devuelve el lote actual de ítems (ej. 3) basado en la paginación interna.
  get currentInternalItems(): TrendingAll[] {
    const start = this.internalPage * this.internalSize;
    const end = start + this.internalSize;
    return this.trending().slice(start, end);
  }

  // 👉 LÓGICA MEJORADA: Avanza y carga proactivamente
  nextInternalPage() {
    const totalLocalItems = this.trending().length;
    const maxInternalPages = Math.ceil(totalLocalItems / this.internalSize);

    // Si podemos avanzar internamente, lo hacemos
    if (this.internalPage < maxInternalPages - 1) {
      this.internalPage++;

      // VERIFICACIÓN PROACTIVA: Si al avanzar llegamos a la penúltima página local,
      // y no hemos cargado todo, empezamos a buscar la siguiente tanda de la API en segundo plano.
      if (this.internalPage >= maxInternalPages - 2 && !this.loading() && !this.allDataLoaded()) {
        // console.log('Carga proactiva iniciada...');
        this.loadNextApiPage();
      }
    }
  }


  prevInternalPage() {
    if (this.internalPage > 0) {
      this.internalPage--;
    }
  }


  get hasTrending() {
    return this.trending().length > 0;
  }
}