import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@vimbal/material';
import { BaseRoutingModule } from './base-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

const baseModules = [DashboardComponent];

@NgModule({
  declarations: [baseModules],
  imports: [CommonModule, BaseRoutingModule, MaterialModule],
})
export class BaseModule {}
