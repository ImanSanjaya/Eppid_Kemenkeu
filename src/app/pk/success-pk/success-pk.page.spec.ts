import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPkPage } from './success-pk.page';

describe('SuccessPkPage', () => {
  let component: SuccessPkPage;
  let fixture: ComponentFixture<SuccessPkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessPkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
