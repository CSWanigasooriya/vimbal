import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { IpfsReceipt } from '@vimbal/model';
import { Buffer } from 'buffer';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'vimbal-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnDestroy {
  @Output() fileBuffer = new EventEmitter<Buffer>();

  public ipfsReceipt: BehaviorSubject<Partial<IpfsReceipt>> =
    new BehaviorSubject({} as Partial<IpfsReceipt>);

  ngOnDestroy(): void {
    this.ipfsReceipt.unsubscribe();
  }

  getIpfsPath(path?: string) {
    return path ? `https://ipfs.io/ipfs/${path}` : null;
  }

  //Convert to IPFS format
  captureFile(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const reader = new window.FileReader();
    reader?.readAsArrayBuffer(file);

    reader.onloadend = () => {
      this.fileBuffer.emit(Buffer.from(reader?.result as ArrayBuffer));
    };
  }
}
