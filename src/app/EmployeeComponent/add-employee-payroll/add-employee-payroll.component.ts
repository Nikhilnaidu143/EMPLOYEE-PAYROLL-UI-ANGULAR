import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Employee';
import { EmployeePayrollService } from 'src/app/employee-payroll.service';

@Component({
  selector: 'app-add-employee-payroll',
  templateUrl: './add-employee-payroll.component.html',
  styleUrls: ['./add-employee-payroll.component.scss']
})
export class AddEmployeePayrollComponent {
  nameError: string;
  id: number;

  constructor(private service: EmployeePayrollService, private router: Router, private activatedRoute: ActivatedRoute) { }

  employee: Employee = new Employee("", "", "", [], null, "", "");

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id != undefined) {
      this.service.getById(this.id).subscribe(empData => {
        let result: any = empData;
        this.employee = result.data;
        console.log("emp depts :- ", this.employee.department);
      })
    }
  }

  /** Saving data  */
  onSubmit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id === undefined) {
      console.log("emp data :- ", this.employee);
      this.service.postCall(this.employee).subscribe((result) => this.router.navigate(["/Home"]));
    }
    else {
      console.log("emp data :- ", this.employee);
      this.service.updateById(this.employee, this.id).subscribe((result) => this.router.navigate(["/Home"]));
    }
  }

  /** Binding department value */
  getValue(value: string, $event) {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id === undefined) {
      if ($event.currentTarget.checked) {
        this.employee.department.push(value);
      }
      else {
        this.employee.department.forEach((element, index) => {
          if (element === value) {
            this.employee.department.splice(index, 1);
          }
        });
      }
      console.log("final depts :- ", this.employee.department);
    }
    else {
      if ($event.currentTarget.checked) {
        if (this.employee.department.length > 0) {
          this.employee.department.forEach((element, index) => {
            if (value === element) {
              this.employee.department.splice(index, 1);
            }
          });
        }
        this.employee.department.push(value);
      }
      else {
        this.employee.department.forEach((element, index) => {
          if (element === value) {
            this.employee.department.splice(index, 1);
          }
        });
      }
      console.log("final depts :- ", this.employee.department);
    }
  }

  /** Name validation. */
  onInput() {
    const nameRegex = /^[A-Z]{1}[A-Za-z\\s]{2,}/;
    if (this.employee.employee_name === "") {
      return this.nameError = " ";
    }
    else if (nameRegex.test(this.employee.employee_name)) {
      return this.nameError = " ";
    }
    else {
      return this.nameError = "Invalid name...!";
    }
  }
}
