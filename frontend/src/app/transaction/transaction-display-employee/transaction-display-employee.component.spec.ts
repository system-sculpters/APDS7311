import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDisplayEmployeeComponent } from './transaction-display-employee.component';

describe('TransactionDisplayEmployeeComponent', () => {
  let component: TransactionDisplayEmployeeComponent;
  let fixture: ComponentFixture<TransactionDisplayEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionDisplayEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionDisplayEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
