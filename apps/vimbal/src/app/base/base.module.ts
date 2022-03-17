import { UploaderComponent } from './../shared/uploader/uploader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@vimbal/material';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { BaseRoutingModule } from './base-routing.module';
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
