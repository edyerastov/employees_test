import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EmpoyeesListComponent } from './empoyees-list/empoyees-list.component';

const appRoutes: Routes =[
  { path: 'employees/', component: EmpoyeesListComponent},
  { path: 'employees/:id', component: EmpoyeesListComponent},
  { path: '**', redirectTo: 'employees/' }
]

@NgModule({
  declarations: [
    AppComponent,
    EmpoyeesListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    PaginationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
