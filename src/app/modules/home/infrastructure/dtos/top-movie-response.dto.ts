export interface TopRatedMovieResponseDto {
  page:          number;
  results:       TopRatedMovieDto[];
  total_pages:   number;
  total_results: number;
}

export interface TopRatedMovieDto {
  adult:             boolean;
  backdrop_path:     string;
  genre_ids:         number[];
  id:                number;
  original_language: string;
  original_title:    string;
  overview:          string;
  popularity:        number;
  poster_path:       string;
  release_date:      Date;
  title:             string;
  video:             boolean;
  vote_average:      number;
  vote_count:        number;
}
