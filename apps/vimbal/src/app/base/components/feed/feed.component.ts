import { Component, Input, OnInit } from '@angular/core';
import { FileContract } from '@vimbal/model';
import { ChainService } from '@vimbal/service';

@Component({
  selector: 'vimbal-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() fileData: FileContract;
  formatedFileData!: Partial<FileContract>;

  constructor(private _chainService: ChainService) {
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

  async tipAuthor(id?: number) {
    const tipAmount = await window.web3.utils.toWei('0.1', 'Ether');
    this._chainService.tipAuthor(id?.toString(), tipAmount).then((payment) => {
      console.log('payment', payment);
      window.location.reload();
    });
  }

  getTipAmount(tip?: number) {
    return window.web3.utils.fromWei(
      tip?.toLocaleString('fullwide', { useGrouping: false }),
      'ether'
    );
  }

  decodeData(data?: string) {
    return data ? atob(data) : '';
  }
}
