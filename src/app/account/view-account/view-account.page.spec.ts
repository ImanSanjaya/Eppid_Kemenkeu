import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccountPage } from './view-account.page';

describe('ViewAccountPage', () => {
  let component: ViewAccountPage;
  let fixture: ComponentFixture<ViewAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
