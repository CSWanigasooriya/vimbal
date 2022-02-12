import { OverlayContainer } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@vimbal/material';
import { PROVIDERS_CONFIG } from '../config/providers.config';
import { RootComponent } from './root.component';
@NgModule({
  declarations: [RootComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [PROVIDERS_CONFIG],
  bootstrap: [RootComponent],
})
export class RootModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('dark-theme');
  }
}
