import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { BaseRoutingModule } from './base-routing.module'
import { ChatComponent } from '../chat/chat.component'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard/dashboard.component'
import { MaterialModule } from '@vimbal/material'
import { NgModule } from '@angular/core'
import { NgxDocViewerModule } from 'ngx-doc-viewer'
import { NgxJdenticonModule } from 'ngx-jdenticon'
import { PipeModule } from '@vimbal/pipe'
import { PreviewComponent } from '../preview/preview.component'
import { ProfileComponent } from './profile/profile.component'
import { ReviewComponent } from '../review/review.component'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { SharedModule } from '../shared/shared.module'
import { SubmitComponent } from './submit/submit.component'
import { NotificationComponent } from './notification/notification.component'

const baseModules = [DashboardComponent]

@NgModule({
  declarations: [
    baseModules,
    SubmitComponent,
    PreviewComponent,
    DashboardComponent,
    ReviewComponent,
    ProfileComponent,
    ChatComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    MaterialModule,
    NgxDocViewerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxJdenticonModule,
    PipeModule,
    ScrollingModule,
    SharedModule,
  ],
})
export class BaseModule {}
