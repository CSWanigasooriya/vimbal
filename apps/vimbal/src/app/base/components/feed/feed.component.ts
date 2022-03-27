import { Component, Input, OnInit } from '@angular/core';
import { FileContract } from '@vimbal/model';

@Component({
  selector: 'vimbal-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() fileData: FileContract;
  formatedFileData!: Partial<FileContract>;

  constructor() {
    this.fileData = {} as FileContract;
  }

  ngOnInit(): void {
    const fileData: FileContract = {
      id: this.fileData.id,
      hash: this.fileData.hash,
      title: this.fileData.title,
      description: this.fileData.description,
      authors: this.fileData.authors,
      keywords: this.fileData.keywords,
      owner: this.fileData.owner,
      tipAmount: this.fileData.tipAmount,
    };

    this.formatedFileData = fileData;
  }
}
