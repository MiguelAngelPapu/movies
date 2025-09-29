import { Component, inject, OnInit, signal } from '@angular/core';
import { TopRatedMoviesFacade } from '../../../application/facades/top-movies.facade';
import { HorizontalCardCarouselComponent } from "../../../../../shared/ui/horizontal-card-carousel/horizontal-card-carousel.component";

@Component({
  selector: 'top-movies',
  imports: [HorizontalCardCarouselComponent],
  templateUrl: './top-movies.component.html',
  styleUrl: './top-movies.component.scss'
})
export class TopMoviesComponent implements OnInit {
  public readonly facade = inject(TopRatedMoviesFacade);
  
  title = signal<string>('Películas mejor valoradas');
  router = signal<string>('/');

  ngOnInit(): void {
    this.facade.loadTopMovies();
  }
}