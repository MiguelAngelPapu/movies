import { Series } from "./series.entity";

export interface TopRatedSeries extends Omit<Series, "season" | "numberOfSeasons">{
    numberOfSeasons?: number
}
