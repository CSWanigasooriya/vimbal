import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FileContract, ReviewContract, UserContract } from '@vimbal/model'
import {
  AuthService,
  FileService,
  FirestoreService,
  ReviewService,
} from '@vimbal/service'
import { Observable } from 'rxjs'

@Component({
  selector: 'vimbal-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isEditable = false
  walletAddress!: string
  walletBalance!: string
  userPublications: FileContract[] = []
  userReviews: ReviewContract[] = []
  photoURL = ''
  currentUser!: Observable<Partial<UserContract> | undefined>

  profileForm = this._fb.group({
    photoURL: [''],
    displayName: [''],
    email: ['', [Validators.email]],
  })

  hasError = (controlName: string, errorName: string) => {
    return this.profileForm.controls[controlName].hasError(errorName)
  }

  updatePhotoURL(event: string) {
    this.profileForm.patchValue({
      photoURL: event,
    })
  }

  constructor(
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _firestoreService: FirestoreService,
    private _authService: AuthService,
    private _fileService: FileService,
    private _reviewService: ReviewService
  ) {
    this._fileService.getFileData().then(async (data) => {
      const fileCount = await data?.methods?.fileCount().call()
      const fileCountInt = parseInt(fileCount, 16)
      for (let index = 1; index <= fileCountInt; index++) {
        const file = await data.methods?.filesByOwner(this.walletAddress, index).call()
        if (file?.id != 0)
          this.userPublications = [...this.userPublications, file].sort(
            (a, b) => b.tipAmount - a.tipAmount
          )
      }
    })

    this._reviewService.getReviewContract().then(async (data) => {
      const reviewCount = await data?.methods?.reviewCount().call()
      const reviewCountInt = parseInt(reviewCount, 16)
      for (let index = 1; index <= reviewCountInt; index++) {
        const review = await data.methods
          ?.reviewsByOwner(this.walletAddress, index)
          .call()
        this.userReviews = [...this.userReviews, review]
      }
    })
  }

  async ngOnInit() {
    this.walletAddress = await this._authService.getWalletAddress()
    this.currentUser = this._authService.getCurrentUser(this.walletAddress)
    this.walletBalance = await this._authService.getWalletBalance()
    this.currentUser.subscribe((user) => {
      this.profileForm.patchValue({
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      })
    })
  }

  handleProfileFormSubmit() {
    if (this.profileForm.invalid) return

    const user = {
      walletAddress: this.walletAddress,
      displayName: this.profileForm.controls.displayName.value,
      email: this.profileForm.controls.email.value,
      photoURL: this.profileForm.controls.photoURL.value,
    } as UserContract
    this._firestoreService.updateUser(user).then(() => {
      this._snackBar.open('Profile updated successfully', 'Close', {
        duration: 2000,
      })
    })
  }
}
