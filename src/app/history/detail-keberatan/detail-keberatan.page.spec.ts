import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKeberatanPage } from './detail-keberatan.page';

describe('DetailKeberatanPage', () => {
  let component: DetailKeberatanPage;
  let fixture: ComponentFixture<DetailKeberatanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailKeberatanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailKeberatanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
