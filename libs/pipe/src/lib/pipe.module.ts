import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitByPipe } from './split-by.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SplitByPipe, OrderByPipe],
  exports: [SplitByPipe, OrderByPipe],
})
export class PipeModule {}
