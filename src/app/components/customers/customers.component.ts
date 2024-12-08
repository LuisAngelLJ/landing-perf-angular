import { Component, ViewChild } from '@angular/core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

interface Customer {
  title: string;
  date: Date;
  text: string;
  image: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: false,
    scrollbar: { draggable: true },
    loop: true,
  };

  customers: Customer[] = [
    {
      title: 'Oasis provides a robust synopsis of our service statuses',
      date: new Date(2022, 1, 1),
      text: `Iterative approaches to corporate strategy foster collaborative
  thinking to further the overall value proposition.`,
      image: 'assets/images/customer-1.png',
    },
    {
      title: 'Oasis has brought clarity to our architecture',
      date: new Date(2022, 3, 1),
      text: `Iterative approaches to corporate strategy foster collaborative
      thinking to further the overall value proposition.`,
      image: 'assets/images/customer-2.png',
    },
  ];

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  constructor() {}

  slideNext() {
    this.swiper?.swiperRef?.slideNext();
  }
  slidePrev() {
    this.swiper?.swiperRef?.slidePrev();
  }

  calcTimeAgo(date: Date): string {
    const now = new Date();

    // Calcula la diferencia en años, meses y días
    const yearsDifference = now.getFullYear() - date.getFullYear();
    const monthsDifference = now.getMonth() - date.getMonth();
    const daysDifference = now.getDate() - date.getDate();

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
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      return formatter.format(-diffInDays, 'day');
    }
  }

}
