import { RouterModule, Routes } from '@angular/router'

import { AuthComponent } from './auth/auth.component'
import { AuthGuard } from '@vimbal/guard'
import { BrowseComponent } from './browse/browse.component'
import { ChatComponent } from './chat/chat.component'
import { ErrorComponent } from './error/error.component'
import { HomeComponent } from './home/home.component'
import { LayoutComponent } from './layout/layout.component'
import { NgModule } from '@angular/core'
import { PreviewComponent } from './preview/preview.component'
import { RatingResolver } from '@vimbal/resolver'
import { ReviewComponent } from './review/review.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'base',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./base/base.module').then((m) => m.BaseModule),
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'browse',
    component: BrowseComponent,
  },
  {
    path: 'preview/:id',
    component: PreviewComponent,
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
  },
  {
    path: 'review/:id',
    component: ReviewComponent,
    resolve: {
      rating: RatingResolver,
    },
  },
  {
    path: '**',
    component: ErrorComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule],
})
export class RootRoutingModule {}
