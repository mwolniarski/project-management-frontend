import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordConfirmationPageComponent } from './reset-password-confirmation-page.component';

describe('ResetPasswordConfirmationPageComponent', () => {
  let component: ResetPasswordConfirmationPageComponent;
  let fixture: ComponentFixture<ResetPasswordConfirmationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordConfirmationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordConfirmationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
