import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessAccountPage } from './success-account.page';

describe('SuccessAccountPage', () => {
  let component: SuccessAccountPage;
  let fixture: ComponentFixture<SuccessAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessAccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
