import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrendingRepository } from '../../domain/repositories/trending.repository';
import { TrendingAll } from '../../domain/entities/trending-all.entity';


@Injectable({ providedIn: 'root' })
export class GetAllTrendingUseCase {
    private repository = inject(TrendingRepository);

    execute(params?: Record<string, any>): Observable<TrendingAll[]> {
        return this.repository.getAll('day', params);
    }
}