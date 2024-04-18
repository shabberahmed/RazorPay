import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentdataComponent } from './paymentdata.component';

describe('PaymentdataComponent', () => {
  let component: PaymentdataComponent;
  let fixture: ComponentFixture<PaymentdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
