import { Component, OnInit } from '@angular/core';
import { Ifairs } from '../../model/fairs';
import { ActivatedRoute, Params } from '@angular/router';
import { FairsService } from '../../services/fairs.service';

@Component({
  selector: 'app-fairs-details',
  templateUrl: './fairs-details.component.html',
  styleUrls: ['./fairs-details.component.scss']
})
export class FairsDetailsComponent implements OnInit {
  fairsId !: string
  fairsObj !: Ifairs

  constructor(private routes: ActivatedRoute,
    private fairservice: FairsService
  ) { }

  ngOnInit(): void {
    this.routes.params.subscribe((params: Params) => {
      this.fairsId = params['fairsId']
      if (this.fairsId) {
        this.fairservice.fetchfairsById(this.fairsId)
          .subscribe({
            next: res => {
              this.fairsObj = res
            },
            error: err => {
              console.log(err);

            }
          })
      }

    })
  }

}
