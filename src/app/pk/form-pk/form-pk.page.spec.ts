import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPkPage } from './form-pk.page';

describe('FormPkPage', () => {
  let component: FormPkPage;
  let fixture: ComponentFixture<FormPkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
