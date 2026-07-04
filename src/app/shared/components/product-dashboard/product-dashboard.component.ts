import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { IProduct } from '../../model/product';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
products : Array<IProduct> = []
  constructor(private productservice : ProductService,
              private router : Router
  ) { }

  ngOnInit(): void {
    this.productservice.fetchproducts().subscribe({
      next : res =>{
        this.products = res
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

  trackByFun(index : number , products : IProduct){
    return products.pid
  }


}
