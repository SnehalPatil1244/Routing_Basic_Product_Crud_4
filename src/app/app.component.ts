import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isloading: boolean = false
  private spinnerservice = inject(SpinnerService)
  private cdr = inject(ChangeDetectorRef)
  title = 'Routing_Basic_Product_Crud_4';

  ngOnInit(): void {
    this.spinnerservice.isLaodingObs$.subscribe({
      next: res => {
        this.isloading = res
        this.cdr.detectChanges()
      }
    })
  }
}
