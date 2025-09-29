import { inject, Injectable } from '@angular/core';
import { delay, forkJoin, map, Observable, switchMap } from 'rxjs';
import { SeriesRepository } from '../../domain/repositories/series.repository';
import { TopRatedSeries } from '../../domain/entities/top-series.entity';


@Injectable({ providedIn: 'root' })
export class GetTopRatedSeriesUseCase {
    private repository = inject(SeriesRepository);

    execute(params?: Record<string, any>): Observable<TopRatedSeries[]> {
        return this.repository.getTopRated(params).pipe(
            switchMap(series =>
                forkJoin(
                    series.map(s =>
                        this.repository.getById(s.id).pipe(
                            map(detail => ({ ...s, numberOfSeasons: detail.numberOfSeasons }) )
                        )
                    )
                )
            )
        );
    }

}