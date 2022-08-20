import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReviewService } from './review.service'
import { Web3StorageService } from './web3-storage.service'
import { AuthService } from './auth.service'
import { ChainService } from './chain.service'
import { FirestoreService } from './firestore.service'
import { GlobalRippleOptionsService } from './global-ripple-options.service'
import { IpfsService } from './ipfs.service'
import { LoggerService } from './logger.service'
import { StorageService } from './storage.service'
import { WhisperService } from './whisper.service'
import { ServiceOptions } from './models/service-options.model'
import { WEB3_STORAGE_TOKEN } from './models/tokens'

const services = [
  AuthService,
  ChainService,
  FirestoreService,
  GlobalRippleOptionsService,
  IpfsService,
  LoggerService,
  ReviewService,
  StorageService,
  Web3StorageService,
  WhisperService,
]

@NgModule({
  imports: [CommonModule],
})
export class ServiceModule {
  static forRoot(options: ServiceOptions) {
    return {
      ngModule: ServiceModule,
      providers: [
        services,
        { provide: WEB3_STORAGE_TOKEN, useValue: options.web3_storage_token },
      ],
    }
  }
}
