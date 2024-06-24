import { Component, OnInit, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import {
  CdkScrollable,
  ScrollDispatcher,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ScrollingModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'material-18-custom-theme';

  scrollable = viewChild.required(CdkScrollable);

  constructor() {
    /**
     * CdkScrollable 指令可以用來監聽element scroll event，但它監聽不到document scroll event，因為指令無法apply 超出App 元件範圍。
        這時，我們需要使用 ScrollDispatcher。
        ScrollDispatcher 不只監聽document scroll event，它也監聽了所有 CdkScrollable 指令的scroll event。
     */

    const scrollDispatcher = inject(ScrollDispatcher);

    scrollDispatcher.scrolled().subscribe((event) => {
      if (!event) {
        console.log('document scrolled :>> ', event);
        return;
      }

      const el = event.getElementRef().nativeElement;
      console.log('el :>> ', el);

      /**想監聽parent / ancestor scroll event */
      const ancestors = scrollDispatcher.getAncestorScrollContainers(el);
      console.log('ancestors :>> ', ancestors);
    });
  }

  ngOnInit() {
    this.scrollable()
      .elementScrolled()
      .subscribe((event) => {
        const target = event.target as HTMLDivElement;
        // console.log('scrolled event :>> ', event);
        console.log('target scrollTop :>> ', target.scrollTop);

        const scrollTop = this.scrollable().measureScrollOffset('top');
        console.log('cdk scrollTop :>> ', scrollTop);
      });
  }

  handleScroll(event: Event) {
    // console.log(event);
  }
}
