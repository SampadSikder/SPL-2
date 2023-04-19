import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawReqComponent } from './withdraw-req.component';

describe('WithdrawReqComponent', () => {
  let component: WithdrawReqComponent;
  let fixture: ComponentFixture<WithdrawReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
