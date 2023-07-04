import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCrudComponent } from './employee-crud.component';

describe('EmployeeCrudComponent', () => {
  let component: EmployeeCrudComponent;
  let fixture: ComponentFixture<EmployeeCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeCrudComponent]
    });
    fixture = TestBed.createComponent(EmployeeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
