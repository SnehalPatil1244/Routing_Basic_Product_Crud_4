import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmationComponent } from '../get-confirmation/get-confirmation.component';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productobj !: IProduct
  productId !: string
  constructor(private router: Router,
    private productservice: ProductService,
    private Routes: ActivatedRoute,
    private snackbar: SnackbarService,
    private matdialog: MatDialog

  ) {
    this.Routes.data.subscribe(res => {
      this.productobj = res['products']
      this.productId = res['products'].pid
    })
  }

  ngOnInit(): void {
    // this.getproducts()
  }

  getproducts() {
    // this.Routes.params.subscribe(param => {
    //   this.productId = param['productId']
    //   if (this.productId) {
    //     this.productservice.fetchproductById(this.productId)
    //       .subscribe({
    //         next: data => {
    //           this.productobj = data
    //         }
    //       })
    //   }
    // })
  }

  redirectToEdit() {
    this.router.navigate(['/products', this.productId, 'edit'], {
      queryParamsHandling: 'preserve',
      relativeTo: this.Routes
    })

  }

  onRemove() {
    let config = new MatDialogConfig()
    config.width = '300px'
    config.disableClose = true
    config.data = `Re You Sure ? You Want To Remove This Id ${this.productId}`
    let matref = this.matdialog.open(GetConfirmationComponent, config)
    matref.afterClosed().subscribe(res => {
      if (res) {
        this.productservice.removeproduct(this.productId).subscribe({
          next: res => {
            this.snackbar.opensnackbar(res.msg)
            this.productservice.fetchproducts().subscribe(res => {
              this.router.navigate(['/products', res[0].pid], {
                queryParams: { cr: res[0].canReturn }
              })

            })

          },
          error: err => {
            console.log(err);

          }
        })
      }
    })

  }

}
