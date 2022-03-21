import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitByPipe } from './split-by.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [SplitByPipe],
  exports: [SplitByPipe],
})
export class PipeModule {}
