import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBiodataPipPage } from './form-biodata-pip.page';

describe('FormBiodataPipPage', () => {
  let component: FormBiodataPipPage;
  let fixture: ComponentFixture<FormBiodataPipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBiodataPipPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBiodataPipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
