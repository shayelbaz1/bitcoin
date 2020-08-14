import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <nav-bar></nav-bar>
    <section class="app-cmp container">
        <router-outlet></router-outlet>
    </section>
  `,
})
export class AppComponent {
    title = 'Bit Coin Wallet';
}
