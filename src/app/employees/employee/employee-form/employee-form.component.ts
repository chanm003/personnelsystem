import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Employee, EmployeeService, UserDirectoryKeywordSearchService, CountriesKeywordSearchService } from '../../../models';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
import * as moment from 'moment';
import { SharepointContextService } from 'sp-pnpjs-utility';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styles: []
})
export class EmployeeFormComponent implements OnInit {
  @Input()
  employee: any;
  @Output() submitButtonClicked: EventEmitter<any> = new EventEmitter();
  dataEntryForm: FormGroup;
  getMatchingPeople = this.userDirectoryKeywordSearchService.search;
  getMatchingCountries = this.countriesKeywordSearchService.search;
  validationMessages = Employee.validationMessages;

  choiceFields = Employee.choiceFields;

  constructor(private fb: FormBuilder, private sharepointContextService: SharepointContextService,
    private userDirectoryKeywordSearchService: UserDirectoryKeywordSearchService,
    private countriesKeywordSearchService: CountriesKeywordSearchService) {
    this.sharepointContextService.setup(environment);
  }

  ngOnInit() {
    this.populateForm(this.employee);
  }

  populateForm(employee: Employee) {
    this.dataEntryForm = employee.toFormGroup(this.fb);
  }

  notifyParent() {
    const itemToSave = Employee.fromFormGroup(this.dataEntryForm, this.employee.Id);
    this.submitButtonClicked.emit(itemToSave);
  }

  iterateControls(fg: FormGroup, func: (FormControl, string) => void ) {
    _.each(fg.controls, (ctrl: AbstractControl, fieldName: string) => {
      if (ctrl instanceof FormGroup) {
        this.iterateControls(ctrl, func);
      } else if (ctrl instanceof FormControl) {
        if (func) {
          func(ctrl, fieldName);
        }
      }
    });
  }

  onSubmit(fg: FormGroup) {
    this.iterateControls(fg, (ctrl: FormControl, fieldName: string) => ctrl.markAsTouched({ onlySelf: true }));
    if (this.dataEntryForm.invalid) { return; };
    this.notifyParent();
  }
}
