import { Component, inject, OnInit, signal } from '@angular/core';
import { HorizontalCardCarouselComponent } from "../../../../../shared/ui/horizontal-card-carousel/horizontal-card-carousel.component";
import { UpcomingFacade } from '../../../application/facades/upcoming.facade';

@Component({
  selector: 'upcoming',
  imports: [HorizontalCardCarouselComponent],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.scss'
})
export class UpcomingComponent implements OnInit {
  public readonly facade = inject(UpcomingFacade);
  
  title = signal<string>('Próximamente');
  router = signal<string>('/');

  ngOnInit(): void {
    this.facade.loadUpcoming();
  }
}