import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@vimbal/material';
import { PipeModule } from '@vimbal/pipe';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { StarRatingComponent } from '../shared/star-rating/star-rating.component';
import { UploaderComponent } from './../shared/uploader/uploader.component';
import { BaseRoutingModule } from './base-routing.module';
import { FeedComponent } from './components/feed/feed.component';
import { PreviewComponent } from './components/preview/preview.component';
import { SubmitComponent } from './components/submit/submit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewComponent } from './review/review.component';

const baseModules = [DashboardComponent];

@NgModule({
  declarations: [
    baseModules,
    SubmitComponent,
    PreviewComponent,
    UploaderComponent,
    FeedComponent,
    ReviewComponent,
    StarRatingComponent,
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    MaterialModule,
    NgxDocViewerModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    ScrollingModule,
  ],
})
export class BaseModule {}
