import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeePayrollComponent } from './add-employee-payroll.component';

describe('AddEmployeePayrollComponent', () => {
  let component: AddEmployeePayrollComponent;
  let fixture: ComponentFixture<AddEmployeePayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeePayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeePayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
