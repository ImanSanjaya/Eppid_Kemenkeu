import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInformasiPublikPage } from './menu-informasi-publik.page';

describe('MenuInformasiPublikPage', () => {
  let component: MenuInformasiPublikPage;
  let fixture: ComponentFixture<MenuInformasiPublikPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuInformasiPublikPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInformasiPublikPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
