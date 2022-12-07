import { Component, EventEmitter, OnDestroy, Output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Component({
  selector: 'vimbal-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss'],
})
export class DropZoneComponent implements OnDestroy {
  @Output() onsuccess = new EventEmitter<string>()
  downloadURL: BehaviorSubject<string> = new BehaviorSubject('')

  isHovering!: boolean

  files: File[] = []

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {}

  toggleHover(event: Event) {
    this.isHovering = event as unknown as boolean
  }

  onDrop(event: Event) {
    const element = event.currentTarget as HTMLInputElement
    const fileList: FileList = element.files ? element.files : new FileList()
    for (let i = 0; i < fileList.length; i++) {
      this.files = [...this.files, fileList.item(i) as File]
    }
  }

  onButtonUpload(event: Event) {
    const element = event.currentTarget as HTMLInputElement
    const fileList: FileList = element.files ? element.files : new FileList()
    for (let i = 0; i < fileList.length; i++) {
      this.files = [...this.files, fileList.item(i) as File]
    }
  }

  setDownloadURL(event: string) {
    this.onsuccess.emit(event)
    this.downloadURL.next(event)
  }

  ngOnDestroy() {
    this.downloadURL.unsubscribe()
  }
}
