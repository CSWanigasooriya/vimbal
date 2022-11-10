import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RatingResolver } from '@vimbal/resolver'
import { AuthComponent } from './auth/auth.component'
import { BrowseComponent } from './browse/browse.component'
import { ErrorComponent } from './error/error.component'
import { HomeComponent } from './home/home.component'
import { LayoutComponent } from './layout/layout.component'
import { PreviewComponent } from './preview/preview.component'
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
