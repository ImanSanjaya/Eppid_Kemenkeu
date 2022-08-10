import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPermohonanPage } from './detail-permohonan.page';

describe('DetailPermohonanPage', () => {
  let component: DetailPermohonanPage;
  let fixture: ComponentFixture<DetailPermohonanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPermohonanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPermohonanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
