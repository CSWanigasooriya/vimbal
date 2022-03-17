/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '@vimbal/model';
import { IpfsService } from '@vimbal/service';

@Component({
  selector: 'vimbal-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class SubmitComponent {
  keywordsSet = new Set([] as string[]);
  authorsSet = new Set([] as string[]);

  // paperSubmitForm = this._fb.group({
  //   title: ['', [Validators.required]],
  //   abstract: [''],
  //   authors: this._fb.array([this._fb.control('')]),
  //   keywords: this._fb.array([this._fb.control('')]),
  //   fileBuffer: [''],
  // });

  paperSubmitForm = this._fb.group({
    title: ['', [Validators.required]],
    abstract: [''],
    authors: this._fb.array([this._fb.control(null)]),
    keywords: this._fb.array([this._fb.control(null)]),
    fileBuffer: [''],
  });

  constructor(
    private _ipfsService: IpfsService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<SubmitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  getFormControl(feild: string) {
    return this.paperSubmitForm.get(feild) as FormControl;
  }

  getFormArray(feild: string) {
    return this.paperSubmitForm.get(feild) as FormArray;
  }

  getErrorMessage(feild: string) {
    return this.getFormControl(feild).hasError('required')
      ? 'You must enter a value'
      : null;
  }

  addAuthor() {
    this.getFormArray('authors').push(this._fb.control(''));
  }

  addAuthorFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.authorsSet.add(event.value);
      event.chipInput?.clear();
    }
  }

  removeAuthor(author: string) {
    this.authorsSet.delete(author);
  }

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.keywordsSet.add(event.value);
      event.chipInput?.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.keywordsSet.delete(keyword);
  }

  patchFileBuffer(buffer: Buffer) {
    this.getFormControl('fileBuffer').patchValue(buffer);
  }

  uploadFileToIpfs(buffer: Buffer) {
    this._ipfsService.uploadFile(buffer).then((res) => {
      console.log(res);
    });
  }
}
