import { DialogComponent } from './../shared/dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@vimbal/material';
import { BaseRoutingModule } from './base-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const baseModules = [DashboardComponent];

@NgModule({
  declarations: [baseModules, DialogComponent],
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
