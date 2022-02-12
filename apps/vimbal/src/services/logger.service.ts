import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logs: string[] = [];

  logInfo(msg: string): void {
    this.log(`INFO: ${msg}`);
  }
  logDebug(msg: string) {
    this.log(`DEBUG: ${msg}`);
  }
  logError(msg: string) {
    this.log(`ERROR: ${msg}`, true);
  }

  private log(msg: string, isErr = false) {
    this.logs.push(msg);
    if (isErr) {
      console.error(msg);
    } else {
      console.log(msg);
    }
  }
}
