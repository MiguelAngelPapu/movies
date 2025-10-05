import { Component, signal } from '@angular/core';
import { NowPlayingComponent } from "../../components/now-playing/now-playing.component";
import { PopularMoviesComponent } from "../../components/popular-movies/popular-movies.component";
import { TopMoviesComponent } from "../../components/top-movies/top-movies.component";
import { UpcomingComponent } from "../../components/upcoming/upcoming.component";
import { TopSeriesComponent } from "../../components/top-series/top-series.component";
import { TabNavigationComponent } from "../../../../../shared/ui/tab-navigation/tab-navigation.component";
import { HeroCarouselComponent } from '../../components/hero-carousel/hero-carousel.component';
import { AutocompleteComponent } from "../../../../../shared/ui/autocomplete/autocomplete.component";

@Component({
  selector: 'page-home-free',
  imports: [NowPlayingComponent, PopularMoviesComponent, TopMoviesComponent, UpcomingComponent, TopSeriesComponent, TabNavigationComponent, HeroCarouselComponent, AutocompleteComponent],
  templateUrl: './home-free.component.html',
  styleUrl: './home-free.component.scss'
})
export class HomeFreeComponent {
  bannerUrls = signal<string[]>(['', '']);  // dos capas
  activeBanner = signal<0 | 1>(0);

  onBannerChange(newUrl: string) {
    const nextIndex = this.activeBanner() === 0 ? 1 : 0;

    // Guardamos el nuevo banner en la capa oculta (inmutable con update)
    this.bannerUrls.update(urls => {
      const copy = [...urls];
      copy[nextIndex] = newUrl;
      return copy;
    });

    // Cambiamos el banner activo → dispara el fade
    this.activeBanner.set(nextIndex);
  }
}
