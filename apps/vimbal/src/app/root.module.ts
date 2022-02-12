import { OverlayContainer } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@vimbal/material';
import { PROVIDERS_CONFIG } from '../config/providers.config';
import { RootComponent } from './root.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LayoutComponent } from './layout/layout.component';
import { RootRoutingModule } from './root.routing';
@NgModule({
  declarations: [RootComponent, LayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RootRoutingModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [PROVIDERS_CONFIG],
  bootstrap: [RootComponent],
})
export class RootModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('dark-theme');
  }
}
