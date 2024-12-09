import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(date: Date | string): string {
    const inputDate = new Date(date); // Asegúrate de manejar cadenas de fecha si es necesario
    const now = new Date();

    // Calcula la diferencia en años, meses y días
    const yearsDifference = now.getFullYear() - inputDate.getFullYear();
    const monthsDifference = now.getMonth() - inputDate.getMonth();
    const daysDifference = now.getDate() - inputDate.getDate();

    // Ajusta el cálculo si no se ha alcanzado el mes o día exacto
    let adjustedYears = yearsDifference;
    let adjustedMonths = monthsDifference;

    if (monthsDifference < 0 || (monthsDifference === 0 && daysDifference < 0)) {
      adjustedYears--; // Resta un año si aún no se cumple el aniversario
    }

    // Usa RelativeTimeFormat para la salida
    const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (adjustedYears >= 1) {
      return formatter.format(-adjustedYears, 'year');
    } else if (monthsDifference >= 1 || (monthsDifference === 0 && daysDifference > 0)) {
      return formatter.format(-adjustedMonths, 'month');
    } else {
      const diffInDays = Math.floor((now.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24));
      return formatter.format(-diffInDays, 'day');
    }
  }
}
