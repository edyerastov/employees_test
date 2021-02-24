import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { EmployesService } from "../services/employes.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Employee } from "../models/employee";
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-empoyees-list',
  templateUrl: './empoyees-list.component.html',
  styleUrls: ['./empoyees-list.component.scss']
})
export class EmpoyeesListComponent implements OnDestroy, OnInit {
  public employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  public employees$: Observable<Employee[]> = this.employeesSubject.asObservable();
  public newEmployee: FormGroup;
  public modalRef!: BsModalRef;
  public editing: boolean = false;
  public subscriptions: Subscription[] = [];
  public employeeId: any = null;
  private destroy = new Subject<any>();

  constructor(private employees: EmployesService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private router: Router) {
    this.newEmployee = new FormGroup({
      "name": new FormControl(null, [Validators.required, Validators.minLength(2)]),
      "salary": new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]),
      "age": new FormControl(null, [Validators.required, Validators.min(18), Validators.max(90), Validators.pattern("^[0-9]*$")]),
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      if (params.id) {
        this.getEmployee(params.id)
      } else {
        this.getEmployees();
      }
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

    this.subscriptions.push(
      this.modalService.onHide.subscribe(() => {
        this.editing = false;
      })
    );
  }

  getEmployees() {
    this.employees.getEmployees().then(employees => {
      this.employeesSubject.next(employees.data.reverse());
    })
  }

  getEmployee(id: any) {
    this.employees.getEmployee(id).then(employee => {
      this.router.navigate(['employees', id]);
      let employeeArr = [];
      employeeArr.push(employee.data);
      this.employeesSubject.next(employeeArr);
    })
  }

  async addEmployee() {
    try {
      await this.employees.addEmployee(JSON.stringify(this.newEmployee.value));
      this.newEmployee.reset();
      this.modalRef.hide();
      this.getEmployees();
    } catch (err) {
      console.log(err);
    }
  }

  setDataToForm(id: any, name: any, salary: any, age: any) {
    this.employeeId = id;
    this.newEmployee.controls.name.setValue(name);
    this.newEmployee.controls.salary.setValue(salary);
    this.newEmployee.controls.age.setValue(age);
    this.editing = true;
  }


  async editEmployee() {
    try {
      await this.employees.editEmployee(this.employeeId, JSON.stringify(this.newEmployee.value))
      this.newEmployee.reset();
      this.modalRef.hide();
      this.editing = false;
      this.getEmployees();
    } catch (err) {
      console.log(err)
    }
  }

  async deleteEmployee(id: any) {
    try {
      await this.employees.deleteEmployee(id)
      this.getEmployees();
    } catch (err) {
      console.log(err)
    }
  }

}
