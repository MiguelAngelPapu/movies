import { inject, Injectable, signal } from "@angular/core";
import { GetNowPlayingUseCase } from "../use-cases/get-now-playing.use-case";
import { Movie } from "../../domain/entities/movie.entity";
import { firstValueFrom } from "rxjs";


@Injectable({ providedIn: "root" })
export class NowPlayingFacade {

  private getNowPlaying = inject(GetNowPlayingUseCase);

  private movies = signal<Movie[]>([]);
  private loading = signal(false);
  private currentPage = 1;

  readonly movies$ = this.movies.asReadonly();
  readonly loading$ = this.loading.asReadonly();

  async loadNowPlaying(page: number = 1) {
    this.loading.set(true);

    try {

      const data = await firstValueFrom(this.getNowPlaying.execute({ page }));
      if (Array.isArray(data)) {
        if (page === 1) this.movies.set(data);
        else this.movies.update(prev => [...prev, ...data]);
        this.currentPage = page;

      } else {

        console.error('Error controlado al cargar películas:', data);
        if (page === 1) this.movies.set([]);

      }
    } catch (error) {
      
      console.error('Error no controlado en el MovieFacade', error);
      if (page === 1) this.movies.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  refreshNowPlaying() {
    this.loadNowPlaying(1);
  }

  loadNextPage() {
    this.loadNowPlaying(this.currentPage + 1);
  }

  get hasMovies() {
    return this.movies().length > 0;
  }
}
