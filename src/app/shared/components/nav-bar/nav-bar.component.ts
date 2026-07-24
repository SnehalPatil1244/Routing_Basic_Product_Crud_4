import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FairsService } from '../../services/fairs.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userRole !: string
  constructor(private productservice: ProductService,
    private userservice: UserService,
    private fairsservice: FairsService,
    private authservie: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.userRole = this.authservie.getUserRole()!
    this.authservie.isLoging$.subscribe({
      next: res => {
        this.userRole = res
      }

    })
  }

  ongoproducts() {
    this.productservice.fetchproducts()
      .subscribe({
        next: res => {
          this.router.navigate(['/products', res[0].pid], {
            queryParams: { cr: res[0].canReturn }
          })
        }
      })
  }

  ongousers() {
    this.userservice.fetchusers().subscribe({
      next: res => {
        this.router.navigate(['/users', res[0].userId], {
          queryParams: { userRole: res[0].userRole }
        })
      }
    })
  }

  ongofairs() {
    this.fairsservice.fetchfairs()
      .subscribe(res => {
        this.router.navigate(['/fairs', res[0].fairId])
      })

  }

  onLogOut() {
    this.authservie.LogOut()
    this.router.navigate([''])

  }

}
