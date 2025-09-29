import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeriesRepository } from '../../domain/repositories/series.repository';
import { Series } from '../../domain/entities/series.entity';


@Injectable({ providedIn: 'root' })
export class GetSeriesUseCase {
    private repository = inject(SeriesRepository);

    execute(id:number, params?: Record<string, any>): Observable<Series> {
        return this.repository.getById(id, params);
    }
}