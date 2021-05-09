import { TestBed } from '@angular/core/testing';

import { ReaccionesService } from './reacciones.service';

describe('ReaccionesService', () => {
  let service: ReaccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReaccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
