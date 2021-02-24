import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpoyeesListComponent } from './empoyees-list.component';

describe('EmpoyeesListComponent', () => {
  let component: EmpoyeesListComponent;
  let fixture: ComponentFixture<EmpoyeesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpoyeesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpoyeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
