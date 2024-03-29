import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core'
import { Subscription } from 'rxjs'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import {
  Component,
  ElementRef,
  Inject,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormControl,
  NgForm,
  ValidationErrors,
  Validators,
} from '@angular/forms'
import { MatChipInputEvent, MatChipList } from '@angular/material/chips'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogData, FileContract } from '@vimbal/model'
import { FirestoreService, IpfsService } from '@vimbal/service'

@Component({
  selector: 'vimbal-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class SubmitComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  private subscriptions = new Subscription()

  isProcessing = false
  removable = true
  addOnBlur = true

  @ViewChild('keywordsList') keywordsList!: MatChipList
  @ViewChildren('authorItem') authorItem!: QueryList<ElementRef>
  @ViewChild('paperForm') public paperForm!: NgForm

  readonly separatorKeysCodes: number[] = [ENTER, COMMA]

  keywordsSet = new Set([] as string[])
  authorsSet = new Set([] as string[])
  fileList: FileList | null = null

  paperSubmitForm = this._fb.group({
    title: ['', [Validators.required]],
    abstract: [null, [Validators.required, Validators.minLength(100)]],
    authors: this._fb.array([this._fb.control('', Validators.required)]),
    keywords: [null, [Validators.required]],
    fileBuffer: [null, [Validators.required]],
    isPublic: [true],
  })

  hasError = (controlName: string, errorName: string) => {
    return this.paperSubmitForm.controls[controlName].hasError(errorName)
  }

  constructor(
    private _firestoreService: FirestoreService,
    private _changeDetectionRef: ChangeDetectorRef,
    private _ipfsService: IpfsService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<SubmitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngAfterViewChecked(): void {
    this._changeDetectionRef.detectChanges()
  }

  ngAfterViewInit() {
    this.subscriptions.add(
      this.authorItem.changes.subscribe(() => {
        if (this.authorItem && this.authorItem.last) {
          this.authorItem.last.nativeElement.focus()
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getFormControl(feild: string) {
    return this.paperSubmitForm.get(feild) as FormControl
  }

  getFormArray(feild: string) {
    return this.paperSubmitForm.get(feild) as FormArray
  }

  addAuthor() {
    this.getFormArray('authors').push(this._fb.control(''))
  }

  removeAuthor(index: number) {
    index > 0 ? this.getFormArray('authors').removeAt(index) : null
  }

  addKeywordFromInput(event: MatChipInputEvent) {
    this.keywordsList.errorState = false
    if (event.value) {
      this.keywordsSet.add(event.value)
      this.getFormControl('keywords').patchValue(Array.from(this.keywordsSet))
      event.chipInput?.clear()
    }
  }

  removeKeyword(keyword: string) {
    this.keywordsSet.delete(keyword)
  }

  setFileList(fileList: FileList | null) {
    this.getFormControl('fileBuffer').patchValue(fileList?.item(0)?.name)
    this.fileList = fileList
  }

  uploadFileToIpfs() {
    this.isProcessing = true
    const fileData = {
      fileName: this.fileList?.item(0)?.name,
      title: this.getFormControl('title').value,
      authors: this.encodeData(
        this.getFormControl('authors')
          .value?.filter((author: string) => author !== '')
          .map((author: any) => author)
          .join(',')
      ),
      keywords: this.encodeData(
        this.getFormControl('keywords')
          .value?.filter((author: string) => author !== '')
          .map((keyword: any) => keyword)
          .join(',')
      ),
      description: this.getFormControl('abstract').value,
      createdAt: new Date().toString(),
      isPublic: this.getFormControl('isPublic').value,
    } as FileContract

    this._ipfsService.uploadFile(this.fileList, fileData).then((res) => {
      this.isProcessing = false
      this._firestoreService.updateFile(fileData).then(() => {
        if (res) {
          this.dialogRef.close(this.paperSubmitForm.value)
          location.reload()
        }
      })
    })
  }

  encodeData(data: string) {
    return btoa(data)
  }

  submitForm() {
    if (this.paperSubmitForm.invalid) return
    this.getFormValidationErrors()
    this.uploadFileToIpfs()
  }

  getFormValidationErrors() {
    Object.keys(this.paperSubmitForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null = this.getFormControl(key).errors
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((error) => {
          console.log(
            'Name: ' + key + ', Error: ' + error + ', Value: ',
            controlErrors[error]
          )
        })
      }
    })
  }
}
