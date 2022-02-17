import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeePayrollComponent } from './EmployeeComponent/add-employee-payroll/add-employee-payroll.component';
import { HomePageComponent } from './EmployeeComponent/home-page/home-page.component';
import { UpdateComponent } from './EmployeeComponent/update/update.component';


const routes: Routes = [
  { path: 'Add', component: AddEmployeePayrollComponent },
  { path: 'Home', component: HomePageComponent },
  { path: 'Update/:id', component: UpdateComponent},
  { path: '', redirectTo: 'Home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
