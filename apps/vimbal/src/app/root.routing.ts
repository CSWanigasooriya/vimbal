import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authRoutes } from '@vimbal/auth';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: 'auth', children: authRoutes },

  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./base/base.module').then((m) => m.BaseModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class RootRoutingModule {}
