import { Component, Input, OnInit } from '@angular/core';
import { FileContract, WithDateFormat } from '@vimbal/model';

@Component({
  selector: 'vimbal-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() fileData: FileContract;
  formatedFileData!: Partial<WithDateFormat<FileContract>>;

  constructor() {
    this.fileData = {} as FileContract;
  }

  ngOnInit(): void {
    const fileData: WithDateFormat<FileContract> = {
      id: this.fileData.id,
      hash: this.fileData.hash,
      title: this.fileData.title,
      description: this.fileData.description,
      authors: this.fileData.authors,
      keywords: this.fileData.keywords,
      timestamp: new Date(this.fileData.timestamp),
      owner: this.fileData.owner,
      tipAmount: this.fileData.tipAmount,
    };

    this.formatedFileData = fileData;
  }
}
