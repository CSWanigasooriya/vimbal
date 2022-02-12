import { MaterialModule } from '@vimbal/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseRoutingModule } from './base-routing.module';

const baseModules = [DashboardComponent];

@NgModule({
  declarations: [baseModules],
  imports: [CommonModule, BaseRoutingModule, MaterialModule],
})
export class BaseModule {}
