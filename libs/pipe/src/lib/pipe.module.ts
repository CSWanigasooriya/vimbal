import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SplitByPipe } from './split-by.pipe'
import { OrderByPipe } from './order-by.pipe'
import { GroupByPipe } from './group-by.pipe'

@NgModule({
  imports: [CommonModule],
  declarations: [SplitByPipe, OrderByPipe, GroupByPipe],
  exports: [SplitByPipe, OrderByPipe, GroupByPipe],
})
export class PipeModule {}
