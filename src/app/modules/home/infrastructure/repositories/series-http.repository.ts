import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, delay, Observable, forkJoin } from "rxjs";
import { GetGenresUseCase } from "../../application/use-cases/get-genres.use-case";
import { SeriesAdapter } from "../adapters/http/series.adapter";
import { TopRatedSeries } from "../../domain/entities/top-series.entity";
import { TopRatedSeriesResponseDto } from "../dtos/top-series-response.dto";
import { TopRatedSeriesMapper } from "../mappers/top-series.mapper";
import { SeriesRepository } from "../../domain/repositories/series.repository";
import { Series } from "../../domain/entities/series.entity";
import { SeriesResponseDto } from "../dtos/series-response.dto";
import { SeriesMapper } from "../mappers/series.mapper";
import { GetSeriesUseCase } from "../../application/use-cases/get-series.use-case";

@Injectable()
export class SeriesHttpRepository extends SeriesRepository {

  private http = inject(HttpClient);
  private httpAdapter = inject(SeriesAdapter);
  private getGenresUseCase = inject(GetGenresUseCase);

  override getTopRated(options?: Record<string, unknown>): Observable<TopRatedSeries[]> {
    if (options) this.httpAdapter.params = options;
    const enpoint = `${this.httpAdapter.apiUrl}/top_rated`;

    return forkJoin(
      this.getGenresUseCase.execute(),
      this.http.get<TopRatedSeriesResponseDto>(enpoint, { params: this.httpAdapter.params })
    ).pipe(
      delay(500),
      map(([allGenres, TopRatedSeriesResponse]) => {
        return TopRatedSeriesResponse.results.map(TopSeriesDto =>
          TopRatedSeriesMapper.fromDto(TopSeriesDto, allGenres)
        );
      }),
    );
  }

  override getById(id: number, options?: Record<string, unknown>): Observable<Series> {
    if (options) this.httpAdapter.params = options;
    const enpoint = `${this.httpAdapter.apiUrl}/${id}`;
    return this.http.get<SeriesResponseDto>(enpoint, { params: this.httpAdapter.params })
      .pipe(
        delay(200),
        map(response => SeriesMapper.fromDto(response))
      );
  }

}


