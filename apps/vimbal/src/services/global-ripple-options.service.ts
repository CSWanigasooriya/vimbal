import { Injectable } from '@angular/core';
import { RippleGlobalOptions } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalRippleOptionsService implements RippleGlobalOptions {
  /** Whether ripples should be disabled globally. */
  disabled = false;
  animation = {
    enterDuration: 300,
    exitDuration: 0,
  };

  terminateOnPointerUp = true;
}
