import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { UsersComponent } from './shared/components/users/users.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { FairsComponent } from './shared/components/fairs/fairs.component';
import { ProductDashboardComponent } from './shared/components/product-dashboard/product-dashboard.component';
import { ProductFormComponent } from './shared/components/product-form/product-form.component';
import { USerDashboardComponent } from './shared/components/user-dashboard/user-dashboard.component';
import { UserFormComponent } from './shared/components/user-form/user-form.component';
import { FairsdashBoardComponent } from './shared/components/fairsdash-board/fairsdash-board.component';
import { FairsDetailsComponent } from './shared/components/fairs-details/fairs-details.component';
import { HomepageComponent } from './shared/components/homepage/homepage.component';
import { AuthComponent } from './shared/components/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'users',
    component: USerDashboardComponent,
    children: [
      {
        path: 'adduser',
        component: UserFormComponent
      },
      {
        path: ':userId',
        component: UsersComponent
      },
      {
        path: ':userId/edit',
        component: UserFormComponent
      },
    ]
  },

  {
    path: 'products',
    component: ProductDashboardComponent,
    children: [
      {
        path: 'addproduct',
        component: ProductFormComponent
      },
      {
        path: ':productId',
        component: ProductsComponent
      },
      {
        path: ':productId/edit',
        component: ProductFormComponent
      },
    ]
  },

  {
    path: 'fairs',
    component: FairsdashBoardComponent,
    children: [
      {
        path: ':fairsId',
        component: FairsDetailsComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
