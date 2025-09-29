import { Injectable } from '@angular/core';
import { Genre } from '../../domain/entities/genre.entity';
import { GenreDto } from '../dtos/genre-response.dto';

@Injectable({ providedIn: 'root' })
export class GenreMapper {

    static fromDtoToEntity(dto: GenreDto): Genre {
        return {
            id: dto.id,
            name: dto.name
        }
    }

}