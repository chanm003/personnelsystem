import { Injectable } from '@angular/core';
import { SharepointContextService, SharePointItem } from 'sp-pnpjs-utility';
import { Employee } from './employee.model';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';

@Injectable()
export class EmployeeService {

  constructor(private sharepointContextService: SharepointContextService) {
    this.sharepointContextService.setup(environment);
  }

  create(item: SharePointItem) {
    return this.sharepointContextService.getWeb().lists.getByTitle(Employee.listName).items
      .add(item.toHttpRequestBody())
      .then(resp => new Employee(resp.data))
      .catch(reason => console.error(reason));
  }

  getAll() {
    return this.sharepointContextService.getWeb().lists.getByTitle(Employee.listName).items
      .select(Employee.fieldsForSelect)
      .expand(Employee.fieldsForExpand)
      .top(10000)
      .get()
      .then(data => {
        return _.map(data, (item) => new Employee(item));
      });
  }

  getById(id) {
    return this.sharepointContextService.getWeb().lists.getByTitle(Employee.listName).items
      .getById(id)
      .select(Employee.fieldsForSelect)
      .expand(Employee.fieldsForExpand)
      .get()
      .then(data => {
        return new Employee(data);
      });
  }

  update(item: SharePointItem) {
    return this.sharepointContextService.getWeb().lists.getByTitle(Employee.listName).items
      .getById(item.Id)
      .update(item.toHttpRequestBody())
      .then(resp => resp.data)
      .catch(reason => console.error(reason));
  }
}

