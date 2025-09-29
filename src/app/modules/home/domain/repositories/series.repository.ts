import { Observable } from "rxjs";
import { TopRatedSeries } from "../entities/top-series.entity";
import { Series } from "../entities/series.entity";


export abstract class SeriesRepository {
  abstract getTopRated(options?: Record<string, unknown>): Observable<TopRatedSeries[]>;
  abstract getById(id: number, options?: Record<string, unknown>): Observable<Series>;
}