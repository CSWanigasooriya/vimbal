import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ScrollToDirective } from './scroll-to.directive'
import { DropzoneDirective } from './dropzone.directive'

@NgModule({
  imports: [CommonModule],
  declarations: [ScrollToDirective, DropzoneDirective],
})
export class DirectiveModule {}
