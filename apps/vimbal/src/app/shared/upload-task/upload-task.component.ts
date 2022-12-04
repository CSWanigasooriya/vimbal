/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage'
import { Observable } from 'rxjs'
import { finalize, tap } from 'rxjs/operators'

@Component({
  selector: 'vimbal-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss'],
})
export class UploadTaskComponent implements OnInit {
  @Output() onupload = new EventEmitter<string>()

  @Input() file!: File

  task!: AngularFireUploadTask

  percentage!: Observable<number | undefined>
  snapshot!: Observable<any>
  downloadURL!: string

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {}

  ngOnInit() {
    this.startUpload()
  }

  startUpload() {
    // The storage path
    const path = `files/${Date.now()}_${this.file.name}`

    // Reference to storage bucket
    const ref = this.storage.ref(path)

    // The main task
    this.task = this.storage.upload(path, this.file)

    // Progress monitoring
    this.percentage = this.task.percentageChanges()

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(),
      // The file's download URL
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise()
        this.onupload.emit(this.downloadURL)
        this.db.collection('storage').add({ downloadURL: this.downloadURL, path })
      })
    )
  }

  isActive(snapshot: { state: string; bytesTransferred: number; totalBytes: number }) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
}
