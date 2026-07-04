import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairsdashBoardComponent } from './fairsdash-board.component';

describe('FairsdashBoardComponent', () => {
  let component: FairsdashBoardComponent;
  let fixture: ComponentFixture<FairsdashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FairsdashBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FairsdashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
