import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFormComponent } from './employee/employee-form/employee-form.component';
import { EmployeeEditFormResolver } from './employee/employee.editform.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      {
        path: '',
        component: EmployeeListComponent,
      },
      {
        path: ':id',
        component: EmployeeComponent,
        resolve: {
          data: EmployeeEditFormResolver
        }
      }
    ]
  },
];
export const routedComponents = [EmployeesComponent, EmployeeListComponent, EmployeeComponent, EmployeeFormComponent];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EmployeeEditFormResolver]
})
export class EmployeesRoutingModule { }
