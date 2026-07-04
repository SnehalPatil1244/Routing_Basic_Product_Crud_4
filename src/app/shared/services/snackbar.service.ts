import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matsnackbar: MatSnackBar) { }

  opensnackbar(msg: string) {
    this.matsnackbar.open(msg, "close", {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'left'
    })
  }

}
