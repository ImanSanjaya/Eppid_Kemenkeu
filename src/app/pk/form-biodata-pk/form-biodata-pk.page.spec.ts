import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBiodataPkPage } from './form-biodata-pk.page';

describe('FormBiodataPkPage', () => {
  let component: FormBiodataPkPage;
  let fixture: ComponentFixture<FormBiodataPkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBiodataPkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBiodataPkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
