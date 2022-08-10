import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStandarLayananPage } from './menu-standar-layanan.page';

describe('MenuStandarLayananPage', () => {
  let component: MenuStandarLayananPage;
  let fixture: ComponentFixture<MenuStandarLayananPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuStandarLayananPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuStandarLayananPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
