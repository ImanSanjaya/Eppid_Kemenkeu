import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProfilPpidPage } from './menu-profil-ppid.page';

describe('MenuProfilPpidPage', () => {
  let component: MenuProfilPpidPage;
  let fixture: ComponentFixture<MenuProfilPpidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuProfilPpidPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProfilPpidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
