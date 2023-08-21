import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserProfilePageComponent } from './edit-user-profile-page.component';
import {UserSettingsService} from "../../../../services/userSettings.service";
import {AuthService} from "../../../../../auth/auth.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {MockComponent} from 'ng-mocks';
import {TabMenu, TabMenuModule} from "primeng/tabmenu";
class MockAuthService {
  user = {value: {userDetails: {value: {organization: null}}}};
}
class MockAuthServiceWithOrg {
  user = new BehaviorSubject({userDetails: new BehaviorSubject({organization: {orgId: 1, name: 'test'}})});
}
class MockDynamicDialogRef {
}
describe('EditUserProfilePageComponent', () => {

  it('should create display organization settings tab', async () => {
    let component: EditUserProfilePageComponent;
    let fixture: ComponentFixture<EditUserProfilePageComponent>;

    await TestBed.configureTestingModule({
      declarations: [ EditUserProfilePageComponent, MockComponent(TabMenu) ],
      providers: [
        {provide: UserSettingsService, useClass: MockDynamicDialogRef},
        {provide: AuthService, useClass: MockAuthServiceWithOrg},
        {provide: DynamicDialogRef, useClass: MockDynamicDialogRef}
      ],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(EditUserProfilePageComponent);
    component = fixture.componentInstance;
    await component.ngOnInit();
    fixture.detectChanges();
    expect(component.items?.filter(e => e.title === 'organization').length).toEqual(1);
  });

  it('should not create display organization settings tab', async () => {
    let component: EditUserProfilePageComponent;
    let fixture: ComponentFixture<EditUserProfilePageComponent>;

    await TestBed.configureTestingModule({
      declarations: [ EditUserProfilePageComponent, MockComponent(TabMenu)],
      providers: [
        {provide: UserSettingsService, useClass: MockDynamicDialogRef},
        {provide: AuthService, useClass: MockAuthService},
        {provide: DynamicDialogRef, useClass: MockDynamicDialogRef}
      ],
      imports: [FormsModule, TabMenuModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(EditUserProfilePageComponent);
    component = fixture.componentInstance;
    await component.ngOnInit();
    fixture.detectChanges();
    expect(component.items?.filter(e => e.title === 'organization').length).toEqual(0);
  });

  it('should display profile settings by default', async () => {
    let component: EditUserProfilePageComponent;
    let fixture: ComponentFixture<EditUserProfilePageComponent>;

    await TestBed.configureTestingModule({
      declarations: [ EditUserProfilePageComponent, MockComponent(TabMenu) ],
      providers: [
        {provide: UserSettingsService, useClass: MockDynamicDialogRef},
        {provide: AuthService, useClass: MockAuthServiceWithOrg},
        {provide: DynamicDialogRef, useClass: MockDynamicDialogRef}
      ],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(EditUserProfilePageComponent);
    component = fixture.componentInstance;
    await component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').id).toContain('profile-save');
  });

  it('should display organization settings after change', async () => {
    let component: EditUserProfilePageComponent;
    let fixture: ComponentFixture<EditUserProfilePageComponent>;

    await TestBed.configureTestingModule({
      declarations: [ EditUserProfilePageComponent, MockComponent(TabMenu) ],
      providers: [
        {provide: UserSettingsService, useClass: MockDynamicDialogRef},
        {provide: AuthService, useClass: MockAuthServiceWithOrg},
        {provide: DynamicDialogRef, useClass: MockDynamicDialogRef}
      ],
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(EditUserProfilePageComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges(true);
    await component.ngOnInit();
    component.activeItem = component.items![1];
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').id).toContain('organization-save');
  });

  it('should delete organization after confirm deleting', async () => {

  })

  it('should sign out user after deleting organization', async () => {

  })

  it('should display delete button', async () => {

  })
});
