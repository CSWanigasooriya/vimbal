import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Buffer } from 'buffer';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'vimbal-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnDestroy {
  @Output() fileBuffer = new EventEmitter<Buffer>();

  public fileName$: BehaviorSubject<string> = new BehaviorSubject('');

  ngOnDestroy(): void {
    this.fileName$.complete();
    this.fileName$.unsubscribe();
  }

  getIpfsPath(path?: string) {
    return path ? `https://ipfs.io/ipfs/${path}` : null;
  }

  //Convert to IPFS format
  captureFile(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.fileName$.next(file.name);
    const reader = new window.FileReader();
    reader?.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.fileBuffer.emit(Buffer.from(reader?.result as ArrayBuffer));
    };
  }
}
