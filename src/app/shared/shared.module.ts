import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ClarityModule } from 'clarity-angular';
import { TagInputModule } from 'ng2-tag-input';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { DatepickerClearButtonComponent } from './datepicker-clear-button/datepicker-clear-button.component';
import {CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ClarityModule, NgxErrorsModule, TagInputModule,
    CalendarModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ClarityModule, NgxErrorsModule, TagInputModule,
    FieldErrorDisplayComponent, DatepickerClearButtonComponent, CalendarModule],
  declarations: [FieldErrorDisplayComponent, DatepickerClearButtonComponent],
})
export class SharedModule { }
