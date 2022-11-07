import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BounceComponent } from './bounce.component'

describe('BounceComponent', () => {
  let component: BounceComponent
  let fixture: ComponentFixture<BounceComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BounceComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(BounceComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
