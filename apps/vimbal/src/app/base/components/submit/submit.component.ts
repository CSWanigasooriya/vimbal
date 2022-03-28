import { Subscription } from 'rxjs';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  Inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, FileContract } from '@vimbal/model';
import { IpfsService } from '@vimbal/service';

@Component({
  selector: 'vimbal-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class SubmitComponent
  implements AfterViewInit, AfterViewChecked, OnDestroy
{
  private subscriptions = new Subscription();
  public isProcessing = false;
  public removable = true;
  public addOnBlur = true;

  @ViewChild('keywordsList') keywordsList!: MatChipList;
  @ViewChildren('authorItem') authorItem!: QueryList<ElementRef>;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  keywordsSet = new Set([] as string[]);
  authorsSet = new Set([] as string[]);

  paperSubmitForm = this._fb.group({
    title: ['', [Validators.required]],
    abstract: [''],
    authors: this._fb.array([this._fb.control('')]),
    keywords: [],
    fileBuffer: [''],
  });

  public hasError = (controlName: string, errorName: string) => {
    return this.paperSubmitForm.controls[controlName].hasError(errorName);
  };

  constructor(
    private _changeDetectionRef: ChangeDetectorRef,
    private _ipfsService: IpfsService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<SubmitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngAfterViewChecked(): void {
    this._changeDetectionRef.detectChanges();
  }

  ngAfterViewInit() {
    this.subscriptions.add(
      this.authorItem.changes.subscribe(() => {
        if (this.authorItem && this.authorItem.last) {
          this.authorItem.last.nativeElement.focus();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getFormControl(feild: string) {
    return this.paperSubmitForm.get(feild) as FormControl;
  }

  getFormArray(feild: string) {
    return this.paperSubmitForm.get(feild) as FormArray;
  }

  addAuthor() {
    this.getFormArray('authors').push(this._fb.control(''));
  }

  removeAuthor(index: number) {
    index > 0 ? this.getFormArray('authors').removeAt(index) : null;
  }

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.keywordsSet.add(event.value);
      this.getFormControl('keywords').patchValue(Array.from(this.keywordsSet));
      event.chipInput?.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.keywordsSet.delete(keyword);
  }

  patchFileBuffer(buffer: Buffer) {
    console.log(buffer);
    this.getFormControl('fileBuffer').patchValue(buffer);
  }

  uploadFileToIpfs(buffer: Buffer) {
    this.isProcessing = true;
    const fileData = {
      title: this.paperSubmitForm.value?.title,
      authors: this.encodeData(
        this.paperSubmitForm.value.authors
          .filter((author: string) => author !== '')
          .map((author: any) => author)
          .join(',')
      ),
      keywords: this.encodeData(
        this.paperSubmitForm.value?.keywords
          .filter((author: string) => author !== '')
          .map((keyword: any) => keyword)
          .join(',')
      ),
      description: this.paperSubmitForm.value.abstract,
    } as FileContract;

    this._ipfsService.uploadFile(buffer, fileData).then(() => {
      this.isProcessing = false;
      this.dialogRef.close(this.paperSubmitForm.value);
    });
  }

  encodeData(data: string) {
    return btoa(data);
  }

  submitForm() {
    this.uploadFileToIpfs(this.paperSubmitForm.value.fileBuffer);
  }
}
