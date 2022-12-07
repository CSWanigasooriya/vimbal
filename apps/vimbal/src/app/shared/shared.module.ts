import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MaterialModule } from '@vimbal/material'
import { PipeModule } from '@vimbal/pipe'
import { NgxDocViewerModule } from 'ngx-doc-viewer'
import { NgxJdenticonModule } from 'ngx-jdenticon'
import { CardComponent } from './card/card.component'
import { DialogComponent } from './dialog/dialog.component'
import { FeedComponent } from './feed/feed.component'
import { SheetComponent } from './sheet/sheet.component'
import { StarRatingComponent } from './star-rating/star-rating.component'
import { UploaderComponent } from './uploader/uploader.component'
import { DropZoneComponent } from './drop-zone/drop-zone.component'
import { UploadTaskComponent } from './upload-task/upload-task.component'

const sharedComponents = [
  SheetComponent,
  UploaderComponent,
  DialogComponent,
  FeedComponent,
  StarRatingComponent,
  CardComponent,
  DropZoneComponent,
]

@NgModule({
  declarations: [...sharedComponents, UploadTaskComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    NgxJdenticonModule,
    NgxDocViewerModule,
    PipeModule,
  ],
  exports: [...sharedComponents],
})
export class SharedModule {}
