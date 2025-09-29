import { Component, inject, OnInit, signal } from '@angular/core';
import { PopularMoviesFacade } from '../../../application/facades/popular-movies.facade';
import { HorizontalCardCarouselComponent } from "../../../../../shared/ui/horizontal-card-carousel/horizontal-card-carousel.component";

@Component({
  selector: 'popular-movies',
  imports: [HorizontalCardCarouselComponent],
  templateUrl: './popular-movies.component.html',
  styleUrl: './popular-movies.component.scss'
})
export class PopularMoviesComponent implements OnInit {
  public readonly facade = inject(PopularMoviesFacade);
  
  title = signal<string>('Películas Populares');
  router = signal<string>('/popular-movies');

  ngOnInit(): void {
    this.facade.loadPopularMovies();
  }
}