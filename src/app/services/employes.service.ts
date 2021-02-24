import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployesService {

  constructor(protected readonly http: HttpClient) { }

  public getEmployees() {
    return this.http.get('http://localhost:3000/data')
      .pipe()
      .toPromise() as Promise<any>
  }

  public getEmployee(id: string) {
    return this.http.get(`http://localhost:3000/data/${id}`)
      .pipe()
      .toPromise() as Promise<any>
  }

  public addEmployee(options: any) {
    return this.http.post('http://localhost:3000/data', options)
      .pipe()
      .toPromise() as Promise<any>
  }

  public editEmployee(id: string, options: any) {
    return this.http.put(`http://localhost:3000/data/${id}`, options)
      .pipe()
      .toPromise() as Promise<any>
  }

  public deleteEmployee(id: string) {
    return this.http.delete(`http://localhost:3000/data/${id}`)
      .pipe()
      .toPromise() as Promise<any>
  }
}

