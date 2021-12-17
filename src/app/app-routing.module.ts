import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AuthGuard } from './components/helpers/auth.guard';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const accountModule = () => import('../app/components/account/account.module').then(x => x.AccountModule);
const usersModule = () => import('../app/components/users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: ListProductComponent },
    { path: 'detail/:id', component: DetailProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    
    {
        path: 'dashboard', component: DashboardComponent, children: [
            { path: '', redirectTo: 'addproduct', pathMatch: 'full' },
            { path: 'addproduct', component: AddProductComponent, loadChildren: usersModule, canActivate: [AuthGuard], },
            { path: 'manageproduct', component: ManageProductComponent, loadChildren: usersModule, canActivate: [AuthGuard], },
            { path: 'editproduct', component: EditProductComponent, loadChildren: usersModule, canActivate: [AuthGuard], },
            { path: 'editproduct/:id', component: EditProductComponent },
        ]
    },
    { path: '**', component: NotFoundComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
