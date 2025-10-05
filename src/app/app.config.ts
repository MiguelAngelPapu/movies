import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// importa lo necesario para español
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MovieRepository } from './modules/home/domain/repositories/movie.repository';
import { MovieHttpRepository } from './modules/home/infrastructure/repositories/movie-http.repository';
import { tmdbApiInterceptor } from './core/interceptors/tmdb-api.interceptor';
import { GenreRepository } from './modules/home/domain/repositories/genre.repository';
import { GenreHttpRepository } from './modules/home/infrastructure/repositories/genre-http.repository';
import { SeriesRepository } from './modules/home/domain/repositories/series.repository';
import { SeriesHttpRepository } from './modules/home/infrastructure/repositories/series-http.repository';
import { TrendingRepository } from './modules/home/domain/repositories/trending.repository';
import { TrendingHttpRepository } from './modules/home/infrastructure/repositories/trending-http.repository';

// registra español globalmente
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {

  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([tmdbApiInterceptor])),
    { provide: GenreRepository, useClass: GenreHttpRepository },
    { provide: TrendingRepository, useClass: TrendingHttpRepository },
    { provide: MovieRepository, useClass: MovieHttpRepository },
    { provide: SeriesRepository, useClass: SeriesHttpRepository }
  ]
};
