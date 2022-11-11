import { TestBed } from '@angular/core/testing'

import { RatingResolver } from './rating.resolver'

describe('RatingResolver', () => {
  let resolver: RatingResolver

  beforeEach(() => {
    TestBed.configureTestingModule({})
    resolver = TestBed.inject(RatingResolver)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })
})
