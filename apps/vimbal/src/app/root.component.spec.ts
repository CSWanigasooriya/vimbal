import { TestBed } from '@angular/core/testing'
import { RootComponent } from './root.component'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RootComponent],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RootComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
