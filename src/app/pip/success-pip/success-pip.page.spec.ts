import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPipPage } from './success-pip.page';

describe('SuccessPipPage', () => {
  let component: SuccessPipPage;
  let fixture: ComponentFixture<SuccessPipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessPipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
