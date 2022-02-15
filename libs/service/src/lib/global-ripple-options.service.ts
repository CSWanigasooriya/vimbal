import { Injectable } from '@angular/core';
import { RippleGlobalOptions } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalRippleOptionsService implements RippleGlobalOptions {
  /** Whether ripples should be disabled globally. */
  disabled = false;
  animation = {
    enterDuration: 500,
    exitDuration: 300,
  };

  terminateOnPointerUp = true;
}
