import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoaccountopeningComponent } from './boaccountopening.component';

describe('BoaccountopeningComponent', () => {
  let component: BoaccountopeningComponent;
  let fixture: ComponentFixture<BoaccountopeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoaccountopeningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoaccountopeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
