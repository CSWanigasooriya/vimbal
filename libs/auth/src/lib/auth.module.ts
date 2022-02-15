import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { MetaMaskComponent } from './container/meta-mask/meta-mask.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ContainerComponent,
        children: [{ path: 'meta-mask', component: MetaMaskComponent }],
      },
    ]),
  ],
  declarations: [ContainerComponent, MetaMaskComponent],
})
export class AuthModule {}
