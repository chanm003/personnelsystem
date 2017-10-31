import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
      <app-header class="header-1"></app-header>
      <app-main class="content-container">
        <ng-content></ng-content>  
      </app-main>
  `,
  styles: []
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
