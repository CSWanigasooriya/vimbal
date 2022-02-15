import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaMaskComponent } from './meta-mask/meta-mask.component';
import { ContainerComponent } from './container/container.component';

const childRoutes: Routes = [
  { path: 'meta-mask', component: MetaMaskComponent },
  { path: '', pathMatch: '', redirectTo: 'meta-mask' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContainerComponent,
        children: childRoutes,
      },
    ]),
  ],
  declarations: [ContainerComponent, MetaMaskComponent],
})
export class AuthModule {}
