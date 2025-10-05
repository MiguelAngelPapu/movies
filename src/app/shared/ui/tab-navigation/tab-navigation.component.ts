import { Component, inject, model, OnInit, signal } from '@angular/core';
import { GenresFacade } from '../../../modules/home/application/facades/genres.facade';
import { MenuItem } from '../../models/menu.type';

@Component({
  selector: 'tab-navigation',
  imports: [],
  templateUrl: './tab-navigation.component.html',
  styleUrl: './tab-navigation.component.scss'
})
export class TabNavigationComponent implements OnInit {
  public readonly facade = inject(GenresFacade);
  isGenreOpen = signal<boolean>(false);
  isMoviesOpen = signal<boolean>(false);
  isTvOpen = signal<boolean>(false);
  isSubscriptionsOpen = signal<boolean>(false);
  menuMovies = model<MenuItem[]>([
      { name: "En Cartelera", router: "/movie/now-playing" },
      { name: "Películas mejor valoradas", router: "/movie/top_rated" },
      { name: "Películas Populares", router: "/movie/popular" },
      { name: "Próximamente", router: "/movie/upcoming" },
     
  ])
  menuSeries = model<MenuItem[]>([
     { name: "Series mejor valoradas", router: "/tv/top_rated" }
  ])

   // Submenú activo
  activeSubmenu = signal<string | null>(null);

  ngOnInit(): void {
    this.facade.loadGenres();
  }

  setActiveSubmenu(name: string) {
    this.activeSubmenu.set(name);
  }

}
