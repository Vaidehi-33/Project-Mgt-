import { TestBed } from '@angular/core/testing';

import { MultiLingualService } from './multi-lingual.service';

describe('MultiLingualService', () => {
  let service: MultiLingualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiLingualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
