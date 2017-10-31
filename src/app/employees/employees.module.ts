import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EmployeesRoutingModule, routedComponents } from './employees-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule
  ],
  declarations: [routedComponents],
  providers: []
})
export class EmployeesModule { }
