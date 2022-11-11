import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'vimbal-bounce',
  templateUrl: './bounce.component.html',
  styleUrls: ['./bounce.component.scss'],
})
export class BounceComponent implements OnInit {
  @Input() title = 'Vimbal'
  displayLetters: string[] = []

  ngOnInit(): void {
    this.displayLetters = Array.from(this.title)
  }
}
