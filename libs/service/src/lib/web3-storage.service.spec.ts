import { TestBed } from '@angular/core/testing'

import { Web3StorageService } from './web3-storage.service'

describe('Web3StorageService', () => {
  let service: Web3StorageService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(Web3StorageService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
