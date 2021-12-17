import { TestComponent } from './components/test/test.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListProductComponent } from './components/list-product/list-product.component';
import { MaterialModule } from './material.module';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Min-MaxValidators
import { MaxValidatorDirective, MinValidatorDirective } from './custom-validator/min-max-directive.directive';
import { MinMaxValidators } from './custom-validator/min-max-validator';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { AlertComponent } from './components/alert/alert.component';
import { fakeBackendProvider } from '../app/components/helpers/fake-backend';
import { JwtInterceptor } from './components/helpers/jwt.interceptor';
import { ErrorInterceptor } from './components/helpers/error.interceptor';
@NgModule({
    declarations: [
        AppComponent,
        MinValidatorDirective,
        MaxValidatorDirective,
        ListProductComponent,
        TopBarComponent,
        TestComponent,
        FooterComponent,
        CarouselComponent,
        DetailProductComponent,
        CartComponent,
        DashboardComponent,
        AddProductComponent,
        ManageProductComponent,
        EditProductComponent,
        NotFoundComponent,
        ScrollToTopComponent,
        AlertComponent
    ],
    imports: [
        [SweetAlert2Module.forRoot()],
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgbModule,
        ToastrModule.forRoot({
            autoDismiss: true,
            maxOpened: 2,
            timeOut: 2000,
        })
    ],
    providers: [
        MinMaxValidators,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
        fakeBackendProvider,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
        ],
    bootstrap: [AppComponent]
})
export class AppModule { }
