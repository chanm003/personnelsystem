
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Employee, EmployeeService } from '../../models';

export class EmployeeEditFormRouteData {
    constructor(public employee: Employee) { }
}

@Injectable()
export class EmployeeEditFormResolver implements Resolve<EmployeeEditFormRouteData> {
    constructor(
        private employeeService: EmployeeService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = +route.params['id'];

        return Promise.all([
            (!!id) ? this.employeeService.getById(id) : Promise.resolve(null)
        ])
            .then((data: any) => {
                const employee = data[0];

                if (employee) {
                    return new EmployeeEditFormRouteData(employee);
                }
                // Return a new object, because we're going to create a new one
                return new EmployeeEditFormRouteData(new Employee());
            })
            .catch((error: any) => {
                console.error(`${error.message}. Heading back to Employee list`);
                this.router.navigate(['/employees']);
                return null;
            });
    }
}