import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployesService {

  constructor(protected readonly http: HttpClient) { }


  public getEmployees() {
    return this.http.get('http://dummy.restapiexample.com/api/v1/employees')
      .pipe()
      .toPromise() as Promise<any>
  }

  public getEmployee(id: string) {
    return this.http.get(`http://dummy.restapiexample.com/api/v1/employee/${id}`)
      .pipe()
      .toPromise() as Promise<any>
  }

  public addEmployee(options: any) {
    return this.http.post('http://dummy.restapiexample.com/api/v1/create', options)
      .pipe()
      .toPromise() as Promise<any>
  }

  public editEmployee(id: string, options: any) {
    return this.http.put(`http://dummy.restapiexample.com/api/v1/update/${id}`, options)
      .pipe()
      .toPromise() as Promise<any>
  }

  public deleteEmployee(id: string) {
    return this.http.delete(`http://dummy.restapiexample.com/api/v1/delete/${id}`)
      .pipe()
      .toPromise() as Promise<any>
  }
}

