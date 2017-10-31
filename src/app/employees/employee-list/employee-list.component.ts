import { Component, OnInit, Input } from '@angular/core';
import { Employee, EmployeeService } from '../../models';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styles: []
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employeeService.getAll()
      .then(data => this.employees = data);
  }
}
