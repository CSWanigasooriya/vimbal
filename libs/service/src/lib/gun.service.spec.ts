import { TestBed } from '@angular/core/testing'

import { GunService } from './gun.service'

describe('ChatService', () => {
  let service: GunService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(GunService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
