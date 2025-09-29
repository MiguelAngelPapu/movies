import { Movie } from "./movie.entity";

export interface Series extends Movie{
  season: Season[];
  numberOfSeasons: number
}

export interface Season {
    airDate:      Date;
    episodeCount: number;
    id:           number;
    name:         string;
    overview:     string;
    posterUrl?:    string;
    seasonNumber: number;
    rating?:       number;
}