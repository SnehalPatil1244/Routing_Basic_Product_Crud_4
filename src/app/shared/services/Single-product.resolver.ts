import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { IProduct } from "../model/product";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProductService } from "./product.service";

@Injectable({
    providedIn : "root"
})
export class newProductresolver implements Resolve<IProduct | IProduct[]>{
    private productservice = inject(ProductService)

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProduct | IProduct[] | Observable<IProduct | IProduct[]> | Promise<IProduct | IProduct[]> {
        let productId = route.paramMap.get('productId')
        if(productId){
            return this.productservice.fetchproductById(productId)
        }else{
              return this.productservice.fetchproducts()
        }
    }
    

}