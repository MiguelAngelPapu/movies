import { Movie } from "../../modules/home/domain/entities/movie.entity";
import { Series } from "../../modules/home/domain/entities/series.entity";
import { TopRatedSeries } from "../../modules/home/domain/entities/top-series.entity";


export type MediaItem = Movie  | Series | TopRatedSeries | undefined;