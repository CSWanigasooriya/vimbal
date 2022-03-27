/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileContract } from '@vimbal/model';
import { ChainService } from '@vimbal/service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vimbal-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  public isLoading = true;
  public fileId!: number;
  public file!: FileContract;
  public authors: string[] = [];
  public keywords: string[] = [];

  private subscriptions = new Subscription();

  constructor(
    private _chainService: ChainService,
    private _route: ActivatedRoute
  ) {
    this.fileId = Number(this._route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getFile();
  }

  getFile() {
    this._chainService.getBlockchainData().then(async (data: any) => {
      this.file = await data.methods.files(this.fileId).call();
    });
  }

  getIpfsUri() {
    return `https://ipfs.io/ipfs/${this.file?.hash}`;
  }

  contentLoaded() {
    this.isLoading = false;
  }

  decodeData(data?: string) {
    return data ? atob(data) : '';
  }
}
