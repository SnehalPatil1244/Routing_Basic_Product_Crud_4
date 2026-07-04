import { Component, OnInit } from '@angular/core';
import { FairsService } from '../../services/fairs.service';
import { Ifairs } from '../../model/fairs';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@Component({
  selector: 'app-fairsdash-board',
  templateUrl: './fairsdash-board.component.html',
  styleUrls: ['./fairsdash-board.component.scss'],
  
})
export class FairsdashBoardComponent implements OnInit {
  fairsArr: Ifairs[] = []
  constructor(private fairsservice: FairsService) { }

  ngOnInit(): void {
    this.fairsservice.fetchfairs().subscribe({
      next: res => {
        this.fairsArr = res
      },
      error: err => {
        console.log(err);

      }
    })
  }

}
