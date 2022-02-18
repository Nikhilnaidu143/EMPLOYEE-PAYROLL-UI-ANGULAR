export class Employee {
    employee_name:string;
    profile_pic:string;
    gender:string;
    department:String;
    salary:number;
    start_date:any;
    note:string;

    /** Parameterized constructor */
    constructor(employee_name: string, profile_pic: string, gender: string, department:String, salary: number, start_date: any, note: string) {
        this.employee_name = employee_name;
        this.profile_pic = profile_pic;
        this.gender = gender;
        this.department = department;
        this.salary = salary;
        this.start_date = start_date;
        this.note = note;
    }
}