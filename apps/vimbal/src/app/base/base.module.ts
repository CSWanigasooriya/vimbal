import { ScrollingModule } from '@angular/cdk/scrolling'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '@vimbal/material'
import { PipeModule } from '@vimbal/pipe'
import { NgxDocViewerModule } from 'ngx-doc-viewer'
import { NgxJdenticonModule } from 'ngx-jdenticon'
import { SharedModule } from '../shared/shared.module'
import { BaseRoutingModule } from './base-routing.module'
import { DashboardComponent } from './dashboard/dashboard.component'
import { PreviewComponent } from '../preview/preview.component'
import { ProfileComponent } from './profile/profile.component'
import { ReviewComponent } from '../review/review.component'
import { SubmitComponent } from './submit/submit.component'

const baseModules = [DashboardComponent]

@NgModule({
  declarations: [
    baseModules,
    SubmitComponent,
    PreviewComponent,
    DashboardComponent,
    ReviewComponent,
    ProfileComponent,
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
