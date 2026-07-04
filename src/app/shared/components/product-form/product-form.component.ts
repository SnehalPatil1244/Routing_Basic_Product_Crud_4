import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm !: FormGroup
  isInEditMode: boolean = false
  productId !: string
  productobj !: IProduct
  DisableUpdatebtn: boolean = false

  constructor(private productservice: ProductService,
    private router: Router,
    private Routes: ActivatedRoute,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.createproductForm()
    this.patchproductdata()

    this.Routes.queryParams.subscribe(res => {
      if (res['cr'] == 0) {
        this.productForm.disable()
        this.DisableUpdatebtn = true
      } else {
        this.productForm.enable()
        this.DisableUpdatebtn = false
      }
    })
  }

  createproductForm() {
    this.productForm = new FormGroup({
      pname: new FormControl(null, [Validators.required]),
      pprice: new FormControl(null, [Validators.required]),
      pstatus: new FormControl('In-Progress'),
      pdescription: new FormControl(null, [Validators.required]),
      pimage: new FormControl(null, [Validators.required]),
      canReturn: new FormControl(1)
    })
  }

  onproductsubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
    } else {
      let product: IProduct = {
        ...this.productForm.value, pid: Date.now().toString()
      }
      this.productservice.catreproduct(product).subscribe({
        next: res => {
          this.productForm.reset()
          this.snackbar.opensnackbar(res.msg)
          this.router.navigate(['products', res.data.pid], {
            queryParams: { cr: product.canReturn }
          })
        },
        error: err => {
          console.log(err);

        }
      })
    }

  }

  patchproductdata() {
    this.productId = this.Routes.snapshot.paramMap.get('productId')!
    if (this.productId) {
      this.isInEditMode = true
      this.productservice.fetchproductById(this.productId)
        .subscribe(res => {
          this.productForm.patchValue(res)
        })
    }

  }

  onUpdatepro() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
    } else {
      let updatedobj: IProduct = {
        ...this.productForm.value, pid: this.productId
      }
      this.productservice.updatedroduct(updatedobj).subscribe({
        next: res => {
          this.productForm.reset()
          this.isInEditMode = false
          this.snackbar.opensnackbar(res.msg)
          this.router.navigate(['products', updatedobj.pid], {
            queryParams: { cr: updatedobj.canReturn }
          })
        },
        error: err => {
          console.log(err);

        }
      })
    }

  }

}
