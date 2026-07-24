import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { HomeComponent } from './shared/components/home/home.component';
import { UsersComponent } from './shared/components/users/users.component';
import { ProductsComponent } from './shared/components/products/products.component';
import { FairsComponent } from './shared/components/fairs/fairs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ProductDashboardComponent } from './shared/components/product-dashboard/product-dashboard.component';
import { ProductFormComponent } from './shared/components/product-form/product-form.component';
import { GetConfirmationComponent } from './shared/components/get-confirmation/get-confirmation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { USerDashboardComponent } from './shared/components/user-dashboard/user-dashboard.component';
import { UserFormComponent } from './shared/components/user-form/user-form.component';
import { FairsCardComponent } from './shared/components/fairs-card/fairs-card.component';
import { FairsDetailsComponent } from './shared/components/fairs-details/fairs-details.component';
import { FairsdashBoardComponent } from './shared/components/fairsdash-board/fairsdash-board.component';
import { HomepageComponent } from './shared/components/homepage/homepage.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthInterceptor } from './shared/services/Auth-Interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    UsersComponent,
    ProductsComponent,
    FairsComponent,
    ProductDashboardComponent,
    ProductFormComponent,
    GetConfirmationComponent,
    USerDashboardComponent,
    UserFormComponent,
    FairsCardComponent,
    FairsDetailsComponent,
    FairsdashBoardComponent,
    HomepageComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
