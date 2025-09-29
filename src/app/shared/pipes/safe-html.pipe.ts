import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  // Inyectamos el servicio DomSanitizer de Angular
  private sanitizer = inject(DomSanitizer);

  /**
   * Transforma una cadena de texto con HTML en un objeto SafeHtml.
   * @param value La cadena de texto que contiene el HTML.
   * @returns Un objeto SafeHtml que Angular considera seguro para renderizar.
   */
  transform(value: string): SafeHtml {
    // Usamos bypassSecurityTrustHtml para marcar la cadena como HTML seguro
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}