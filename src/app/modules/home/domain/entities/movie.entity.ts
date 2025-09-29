import { Genre } from "./genre.entity";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: Date;
  posterUrl?: string;
  rating?: number;
  genres?: Genre[];
}
