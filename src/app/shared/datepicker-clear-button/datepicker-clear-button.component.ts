import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datepicker-clear-button',
  templateUrl: './datepicker-clear-button.component.html',
  styles: [
    `.absolute-right {
      -moz-transform: translateX(-100%);
      -ms-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      -o-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  `]
})
export class DatepickerClearButtonComponent implements OnInit {
  @Input()
  formGroup: FormGroup;
  @Input()
  fieldName: string; /* can be address.street */

  constructor() { }

  ngOnInit() {
  }

  showClearButton() {
    const selectedDate: any = this.formGroup.get(this.fieldName).value as Date;
    return !!selectedDate;
  }

  onClearButtonClicked() {
    this.formGroup.get(this.fieldName).patchValue(null);
  }
}
