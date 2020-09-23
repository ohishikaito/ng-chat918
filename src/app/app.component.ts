import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
    <app-header></app-header>
    <app-chat></app-chat>
  `,
})
export class AppComponent {
  constructor() {}
}
