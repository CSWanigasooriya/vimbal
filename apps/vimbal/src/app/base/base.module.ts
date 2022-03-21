import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@vimbal/material';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { UploaderComponent } from './../shared/uploader/uploader.component';
import { BaseRoutingModule } from './base-routing.module';
import { FeedComponent } from './components/feed/feed.component';
import { PreviewComponent } from './components/preview/preview.component';
import { SubmitComponent } from './components/submit/submit.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const baseModules = [DashboardComponent];

@NgModule({
  declarations: [
    baseModules,
    SubmitComponent,
    PreviewComponent,
    UploaderComponent,
    FeedComponent,
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    MaterialModule,
    NgxDocViewerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BaseModule {}
