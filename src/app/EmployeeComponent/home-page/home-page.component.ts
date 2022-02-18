import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeePayrollService } from 'src/app/service/employee-payroll.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  employees: any = [];

  constructor(private service: EmployeePayrollService, private router: Router) { }

  ngOnInit(): void {
    this.service.getAllCall().subscribe(employeeData => {
      this.employees = employeeData;
    })
  }

  /** Update by id. */
  update(id: number) {
    this.router.navigate(['Update', id]);
  }

  /** Delete by id */
  delete(id: number) {
    this.service.deleteCall(id).subscribe((result) => window.location.reload());
  }
}




