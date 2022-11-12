import { RouterModule, Routes } from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component'
import { NgModule } from '@angular/core'
import { NotificationComponent } from './notification/notification.component'
import { ProfileComponent } from './profile/profile.component'

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'notification',
    component: NotificationComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {}
