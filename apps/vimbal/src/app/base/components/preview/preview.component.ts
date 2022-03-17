import { Component, Input } from '@angular/core';
import { FormatedTimestampFileContract } from '@vimbal/model';

@Component({
  selector: 'vimbal-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  @Input() fileData: FormatedTimestampFileContract;

  constructor() {
    this.fileData = {} as FormatedTimestampFileContract;
  }
}
