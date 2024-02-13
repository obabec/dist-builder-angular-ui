import { TestBed } from '@angular/core/testing';

import { MetadataHttpService } from './metadata-http.service';

describe('BuilderMetadataService', () => {
  let service: MetadataHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadataHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
