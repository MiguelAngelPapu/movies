import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateNumber'
})
export class TruncateNumberPipe implements PipeTransform {
  /**
   * Trunca un número y lo formatea como un string con un número fijo de decimales.
   * @param value El número a procesar.
   * @param decimalPlaces El número de decimales a mantener. Por defecto es 1.
   * @returns El número formateado como string, o null.
   */
  transform(value: number | null | undefined, decimalPlaces: number = 1): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    // --- Parte 1: Truncar el número (tu lógica original) ---
    const factor = Math.pow(10, decimalPlaces);
    const truncatedValue = Math.trunc(value * factor) / factor;

    // --- Parte 2: Formatear a string con decimales fijos ---
    // toFixed() convierte el número en un string y añade ceros si es necesario.
    return truncatedValue.toFixed(decimalPlaces);
  }
}