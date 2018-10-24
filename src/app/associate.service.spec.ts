/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssociateService } from './associate.service';

describe('AssociateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssociateService]
    });
  });

  it('should ...', inject([AssociateService], (service: AssociateService) => {
    expect(service).toBeTruthy();
  }));
});
