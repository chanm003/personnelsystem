import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService } from '../../models';
import { SharepointContextService } from 'sp-pnpjs-utility';
import { Subscription } from 'rxjs/Subscription';
import { EmployeeEditFormRouteData } from './employee.editform.resolver.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {
  private id: number;
  itemBeingEdited: Employee;

  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.route.data.subscribe((resolved: {data: EmployeeEditFormRouteData}) => {
      this.itemBeingEdited = resolved.data.employee;
    });

    this.route
      .params
      .map(params => params['id'])
      .subscribe(id => {
        this.id = +id;
      });
  }

  isNewForm() {
    return isNaN(this.id);
  }

  save(itemToSave: Employee) {
    if (this.isNewForm()) {
      this.employeeService.create(itemToSave)
        .then(resp => this.router.navigate(['/employees']));
    } else {
      this.employeeService.update(itemToSave)
        .then(resp => this.router.navigate(['/employees']));
    }
  }
}
