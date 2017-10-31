import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styles: []
})
export class FieldErrorDisplayComponent implements OnInit {
  @Input() displayError: boolean;
  constructor() { }

  ngOnInit() {
  }

}
