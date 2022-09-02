import { TestBed } from '@angular/core/testing';

import { UserOperationService } from './user-operation.service';

describe('UserOperationService', () => {
  let service: UserOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
