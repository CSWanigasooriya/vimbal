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
import { PreviewComponent } from './preview/preview.component';
import { SubmitComponent } from './components/submit/submit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReviewComponent } from './review/review.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxJdenticonModule } from 'ngx-jdenticon';
import { BrowseComponent } from './browse/browse.component';
import { HomeComponent } from './home/home.component';

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
    ProfileComponent,
    BrowseComponent,
    HomeComponent,
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
    NgxJdenticonModule,
  ],
})
export class BaseModule {}
