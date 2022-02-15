import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logs: string[] = [];

  logInfo(msg: string | null): void {
    this.log(`%c INFO: ${msg} ⚠️`, false, 'color: yellow;');
  }
  logDebug(msg: string | null) {
    this.log(`%c DEBUG: ${msg} 🛠️`, false, 'color: blue;');
  }
  logError(msg: string | null) {
    this.log(`%c ERROR: ${msg}`, true, 'color: red;');
  }

  logObject(obj: object | null) {
    console.table(obj || {});
  }

  private log(msg: string, isErr = false, style?: string) {
    this.logs.push(msg);
    if (isErr) {
      console.error(msg, style);
    } else {
      console.log(msg, style);
    }
  }
}
