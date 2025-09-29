import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GenreRepository } from "../../domain/repositories/genre.repository";
import { delay, map, Observable } from "rxjs";
import type { Genre } from "../../domain/entities/genre.entity";
import { GenreAdapter } from "../adapters/http/genre.adapter";
import type { GenreResponseDto } from "../dtos/genre-response.dto";
import { GenreMapper } from "../mappers/genre.mapper";


@Injectable()
export class GenreHttpRepository extends GenreRepository {
    private http = inject(HttpClient);
    private httpAdapter = inject(GenreAdapter);


    override getAll(options?: Record<string, unknown>): Observable<Genre[]> {

        if (options) this.httpAdapter.params = options;
        const enpoint = `${this.httpAdapter.apiUrl}/movie/list`;
        return this.http.get<GenreResponseDto>(enpoint, { params: this.httpAdapter.params })
            .pipe(
                delay(500),
                map(response => response.genres.map(GenreMapper.fromDtoToEntity))
            );

    }

}