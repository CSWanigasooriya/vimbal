import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './auth/auth.component'
import { HomeComponent } from './base/home/home.component'
import { LayoutComponent } from './layout/layout.component'
import { ErrorComponent } from './shared/error/error.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
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
    path: '**',
    component: ErrorComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule],
})
export class RootRoutingModule {}
