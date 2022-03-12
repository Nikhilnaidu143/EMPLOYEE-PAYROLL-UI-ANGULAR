import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/Model/Department';
import { Employee } from 'src/app/Model/Employee';
import { EmployeePayrollService } from 'src/app/service/employee-payroll.service';

@Component({
  selector: 'app-add-employee-payroll',
  templateUrl: './add-employee-payroll.component.html',
  styleUrls: ['./add-employee-payroll.component.scss']
})
export class AddEmployeePayrollComponent {
  nameError: string;
  id: number;
  departmentList:Department[];

  constructor(private service: EmployeePayrollService, private router: Router, private activatedRoute: ActivatedRoute) { }

  employee: Employee = new Employee("", "", "", "", null, "", "");

  ngOnInit(): void {
    this.employee.salary = 350000;
    this.getDepartments();
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id != undefined) {
      this.service.getById(this.id).subscribe(empData => {
        let result: any = empData;
        this.employee = result.data;
        
        let checkedDeptsList = this.employee.department.split(",");
        for(let i = 0; i < checkedDeptsList.length; i++) {
          this.departmentList.filter(x => x.name == checkedDeptsList[i]).map(x => x.isChecked=true);
        }
      })
    }
  }

  getDepartments() {
    this.departmentList = [
      {id:1 , name:"Hr" , isChecked: false},
      {id:2 , name:"Sales" , isChecked: false},
      {id:3 , name:"Finance" , isChecked: false},
      {id:4 , name:"Engineer" , isChecked: false}
    ]
  }

  /** Saving data  */
  onSubmit() {
    this.employee.department = this.departmentList.filter(x => x.isChecked==true).map(x => x.name).join(",").toString();
    if (this.id === undefined) {
      console.log("emp data :- ", this.employee);
      this.service.postCall(this.employee).subscribe((result) => this.router.navigate(["/Home"]));
    }
    else {
      console.log("Updated emp data :- ", this.employee);
      this.service.updateById(this.employee, this.id).subscribe((result) => this.router.navigate(["/Home"]));
    }
  }

  getDeptValue() {
    console.log(this.departmentList);
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