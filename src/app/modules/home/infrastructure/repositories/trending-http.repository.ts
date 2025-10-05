import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay, map, Observable } from "rxjs";
import { TrendingRepository } from "../../domain/repositories/trending.repository";
import { TrendingAdapter } from "../adapters/http/trending.adapter";
import { TrendingAll } from "../../domain/entities/trending-all.entity";
import { TrendingAllResponseDto } from "../dtos/trending-all-response.dto";
import { TrendingAllMapper } from "../mappers/trending-all.mapper";
import { TrendingAllType } from "../types/trending-type";


@Injectable()
export class TrendingHttpRepository extends TrendingRepository {
    private http = inject(HttpClient);
    private httpAdapter = inject(TrendingAdapter);


    override getAll(time_window: TrendingAllType, options?: Record<string, unknown>): Observable<TrendingAll[]> {
        if (options) this.httpAdapter.params = options;

        const enpoint = `${this.httpAdapter.apiUrl}/all/${time_window}`;
        return this.http.get<TrendingAllResponseDto>(enpoint, { params: this.httpAdapter.params })
            .pipe(
                delay(500),
                map(response => response.results.map(TrendingAllMapper.fromDtoToEntity))
            );

    }

}