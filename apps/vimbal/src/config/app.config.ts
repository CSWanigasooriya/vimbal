import { InjectionToken } from '@angular/core';

export interface AppConfig {
  title: string;
  dark_theme: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const VIMBAL_DI_CONFIG: AppConfig = {
  title: 'Vimbal',
  dark_theme: true,
};
