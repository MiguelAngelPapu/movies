import { Component} from '@angular/core';
import { NowPlayingComponent } from "../../components/now-playing/now-playing.component";
import { PopularMoviesComponent } from "../../components/popular-movies/popular-movies.component";
import { TopMoviesComponent } from "../../components/top-movies/top-movies.component";
import { UpcomingComponent } from "../../components/upcoming/upcoming.component";
import { TopSeriesComponent } from "../../components/top-series/top-series.component";

@Component({
  selector: 'page-home-free',
  imports: [NowPlayingComponent, PopularMoviesComponent, TopMoviesComponent, UpcomingComponent, TopSeriesComponent],
  templateUrl: './home-free.component.html',
  styleUrl: './home-free.component.scss'
})
export class HomeFreeComponent {


}
