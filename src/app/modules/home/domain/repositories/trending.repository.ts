import { Observable } from 'rxjs';
import { TrendingAll } from '../entities/trending-all.entity';
import { TrendingAllType } from '../../infrastructure/types/trending-type';

export abstract class TrendingRepository {
  abstract getAll(time_window: TrendingAllType, options?: Record<string, unknown>): Observable<TrendingAll[]>;
}