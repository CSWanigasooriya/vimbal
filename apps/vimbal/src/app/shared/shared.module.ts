import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UploaderComponent } from './uploader/uploader.component'
import { FeedComponent } from './feed/feed.component'
import { StarRatingComponent } from './star-rating/star-rating.component'
import { CardComponent } from './card/card.component'
import { BounceComponent } from './bounce/bounce.component'
import { MaterialModule } from '@vimbal/material'
import { RouterModule } from '@angular/router'
import { PipeModule } from '@vimbal/pipe'
import { NgxJdenticonModule } from 'ngx-jdenticon'
import { SplashComponent } from './splash/splash.component'
import { SheetComponent } from './sheet/sheet.component'
import { DialogComponent } from './dialog/dialog.component'
import { NgxDocViewerModule } from 'ngx-doc-viewer'

const sharedComponents = [
  SplashComponent,
  SheetComponent,
  UploaderComponent,
  DialogComponent,
  FeedComponent,
  StarRatingComponent,
  CardComponent,
  BounceComponent,
]

@NgModule({
  declarations: [...sharedComponents],
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
