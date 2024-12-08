import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollIntoView]',
})
export class ScrollIntoViewDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'in-view');
          //console.log(this.el.nativeElement);
        }
      },
      { threshold: 0.1 } // Se ejecuta cuando el 10% del elemento es visible
    );

    observer.observe(this.el.nativeElement);
  }
}
