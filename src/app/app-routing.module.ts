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
import { AuthGuard } from './shared/services/Auth.Guard';
import { canDeactivatecomponent } from './shared/services/canDeactivate.Guard';
import { userRoleGuard } from './shared/services/userRole.Guard';
import { newProductresolver } from './shared/services/Single-product.resolver';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [AuthGuard, userRoleGuard],
    data: {
      userRole: ['buyer', 'admin', 'superAdmin']
    }
  },
  {
    path: 'users',
    component: USerDashboardComponent,
    canActivate: [AuthGuard, userRoleGuard],
    data: {
      userRole: ['admin', 'superAdmin']
    },
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
        component: UserFormComponent,
        canDeactivate: [canDeactivatecomponent]
      },
    ]
  },

  {
    path: 'products',
    component: ProductDashboardComponent,
    canActivate: [AuthGuard, userRoleGuard],
    data: {
      userRole: ['buyer', 'admin', 'superAdmin']
    },
    resolve: {
      products: newProductresolver
    },
    children: [
      {
        path: 'addproduct',
        component: ProductFormComponent
      },
      {
        path: ':productId',
        component: ProductsComponent,
        resolve: {
          products: newProductresolver
        }

      },
      {
        path: ':productId/edit',
        component: ProductFormComponent,
        canDeactivate: [canDeactivatecomponent]
      },
    ]
  },

  {
    path: 'fairs',
    component: FairsdashBoardComponent,
    canActivate: [AuthGuard, userRoleGuard],
    data: {
      userRole: ['superAdmin']
    },
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
