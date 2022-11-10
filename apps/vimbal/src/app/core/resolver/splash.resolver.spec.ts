import { TestBed } from '@angular/core/testing'

import { SplashResolver } from './splash.resolver'

describe('SplashResolver', () => {
  let resolver: SplashResolver

  beforeEach(() => {
    TestBed.configureTestingModule({})
    resolver = TestBed.inject(SplashResolver)
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy()
  })
})
