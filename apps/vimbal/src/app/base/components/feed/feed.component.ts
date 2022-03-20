import { Component, Input } from '@angular/core';
import { FileContract, WithDateFormat } from '@vimbal/model';

@Component({
  selector: 'vimbal-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  @Input() fileData: WithDateFormat<FileContract>;

  constructor() {
    this.fileData = {} as WithDateFormat<FileContract>;
  }
}
