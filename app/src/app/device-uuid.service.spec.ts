import { TestBed } from '@angular/core/testing';

import { DeviceUUIDService } from './device-uuid.service';

describe('DeviceUUIDService', () => {
  let service: DeviceUUIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceUUIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
