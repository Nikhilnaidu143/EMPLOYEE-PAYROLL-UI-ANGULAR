import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeePayrollService {

  constructor(private httpClient: HttpClient) { }

  /** Retrive all data from database. */
  getAllCall() {
    return this.httpClient.get(`http://localhost:8080/payroll/getAll`);
  }

  /** Posting data into database. */
  postCall(employee: any) {
    return this.httpClient.post(`http://localhost:8080/payroll/create`, employee, { responseType: "text" as "json" });
  }

  /** Deleting employee details by id. */
  deleteCall(id: number) {
    return this.httpClient.delete(`http://localhost:8080/payroll/delete/${id}`);
  }

  /** Retrive employee details by id. */
  getById(id: number) {
    return this.httpClient.get(`http://localhost:8080/payroll/get/${id}`);
  }

  /** Update employee details by id. */
  updateById(employee: any, id: number) {
    return this.httpClient.put(`http://localhost:8080/payroll/update/${id}`, employee, { responseType: "text" as "json" });
  }
}
