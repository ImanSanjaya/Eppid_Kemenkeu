import { TestBed } from '@angular/core/testing';

import { PpidCmsService } from './ppid-cms.service';

describe('PpidCmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PpidCmsService = TestBed.get(PpidCmsService);
    expect(service).toBeTruthy();
  });
});
