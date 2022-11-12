import { GANACHE_URL, WEB3_STORAGE_TOKEN } from './models/tokens'

import { AuthService } from './auth.service'
import { ChatService } from './chat.service'
import { CommonModule } from '@angular/common'
import { FileService } from './file.service'
import { FirestoreService } from './firestore.service'
import { GlobalRippleOptionsService } from './global-ripple-options.service'
import { IpfsService } from './ipfs.service'
import { LoggerService } from './logger.service'
import { NgModule } from '@angular/core'
import { NotificationService } from './notification.service'
import { ReviewService } from './review.service'
import { ServiceOptions } from './models/service-options.model'
import { StorageService } from './storage.service'
import { UserService } from './user.service'
import { Web3StorageService } from './web3-storage.service'

const services = [
  AuthService,
  FileService,
  FirestoreService,
  GlobalRippleOptionsService,
  IpfsService,
  LoggerService,
  ReviewService,
  StorageService,
  Web3StorageService,
  UserService,
  NotificationService,
  ChatService,
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
        { provide: GANACHE_URL, useValue: options.ganacheUrl },
      ],
    }
  }
}
