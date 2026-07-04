import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmationComponent } from '../get-confirmation/get-confirmation.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  UsersDetails !: Iuser
  userId !: string
  constructor(private routes: ActivatedRoute,
    private snackbar: SnackbarService,
    private userservice: UserService,
    private matdialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routes.params.subscribe(param => {
      this.userId = param['userId']
      if (this.userId) {
        this.userservice.fetchuserById(this.userId).subscribe({
          next: res => {
            this.UsersDetails = res
          },
          error: err => {
            console.log(err);

          }
        })
      }
    })


  }

  onRemove() {
    let config = new MatDialogConfig()
    config.width = '300px'
    config.disableClose = true
    config.data = `Are You Sure ? You Want To Remove This Id ${this.userId}`
    let matref = this.matdialog.open(GetConfirmationComponent, config)
    matref.afterClosed().subscribe(res => {
      if (res) {
        this.userservice.onRemoveuser(this.UsersDetails.userId)
          .subscribe(res => {
            this.snackbar.opensnackbar(res.msg)
            this.userservice.fetchusers()
              .subscribe(res => {
                this.router.navigate(['/users', res[0].userId])
              })
          })
      }
    })

  }

}
