import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'autocomplete',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent {
  query = '';
  results: { title: string; image?: string }[] = [];

  // placeholder si no hay imagen o falla
  placeholder = 'https://via.placeholder.com/92x138?text=No+Image';

  // Simulación de búsqueda (sustituye por llamada HTTP)
  onSearch() {
    const q = this.query?.trim().toLowerCase();
    if (!q || q.length < 2) {
      this.results = [];
      return;
    }

    // Ejemplo de resultados con imágenes
    this.results = [
      { title: 'Angular Fundamentals Fundamentals', image: 'https://angular.io/assets/images/logos/angular/angular.png' },
      { title: 'Angular Signals', image: 'https://angular.io/assets/images/logos/angular/angular_solidBlack.png' },
      { title: 'Angular Signals', image: 'https://angular.io/assets/images/logos/angular/angular_solidBlack.png' },
      { title: 'Angular Signals', image: 'https://angular.io/assets/images/logos/angular/angular_solidBlack.png' },

      { title: 'Angular Animations', image: '' } // ejemplo sin imagen -> fallback
    ]
      // filtrar por query (simulando búsqueda)
      .filter(r => r.title.toLowerCase().includes(q));
  }

  // input handler sin ngModel
  onInput(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    this.query = v;
    this.onSearch();
  }

  selectItem(item: { title: string; image?: string }) {
    this.query = item.title;
    this.results = [];
    // aquí podrías emitir un evento o navegar al detalle
  }

  // si la imagen falla, ponemos placeholder
  onImageError(ev: Event) {
    const img = ev.target as HTMLImageElement;
    if (img && img.src !== this.placeholder) {
      img.src = this.placeholder;
    }
  }
}