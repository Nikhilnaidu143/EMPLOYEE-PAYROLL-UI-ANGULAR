import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/Model/Employee';
import { EmployeePayrollService } from 'src/app/service/employee-payroll.service';

@Component({
  selector: 'app-add-employee-payroll',
  templateUrl: './add-employee-payroll.component.html',
  styleUrls: ['./add-employee-payroll.component.scss']
})
export class AddEmployeePayrollComponent {
  nameError: string;
  salaryError: string;
  id: number;

  constructor(private service: EmployeePayrollService, private router: Router, private activatedRoute: ActivatedRoute) { }

  employee: Employee = new Employee("", "", "", "", null, "", "");

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
    if (this.id === undefined) {
      console.log("emp data :- ", this.employee);
      this.service.postCall(this.employee).subscribe((result) => this.router.navigate(["/Home"]));
    }
    else {
      console.log("emp data :- ", this.employee);
      this.service.updateById(this.employee, this.id).subscribe((result) => this.router.navigate(["/Home"]));
    }
  }

  /** Binding department. */
  getValue(value: String) {
    this.employee.department = value;
    console.log(this.employee.department);
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

  /** Salary validation. */
  salaryValidation() {
    if (this.employee.salary < 1000) {
      return this.salaryError = "Salary must be greater than 1000.";
    }
    else {
      return this.salaryError = " ";
    }
  }
}
