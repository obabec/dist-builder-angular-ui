import { TestBed } from '@angular/core/testing';

import { MetadataParserService } from './metadata-parser.service';

describe('MetadataParserService', () => {
  let service: MetadataParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadataParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
