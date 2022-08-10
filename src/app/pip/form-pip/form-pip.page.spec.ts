import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPipPage } from './form-pip.page';

describe('FormPipPage', () => {
  let component: FormPipPage;
  let fixture: ComponentFixture<FormPipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
