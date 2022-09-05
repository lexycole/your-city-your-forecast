import { TestBed } from '@angular/core/testing';

import { YourPostalCodeService } from './your-postal-code.service';

describe('YourPostalCodeService', () => {
  let service: YourPostalCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YourPostalCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
