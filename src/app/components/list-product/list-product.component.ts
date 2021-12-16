import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cartitem';
import { MiddlewareService } from 'src/app/services/middleware.service';

@Component({
    selector: 'app-list-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.css']
})

export class ListProductComponent implements OnInit {
    data: Product[] = []
    sortedData: Product[] = []
    searchString;
    categoryString;
    sortby: string;

    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private middlewareService: MiddlewareService
    ) { }

    ngOnInit(): void {
        this.getListProduct();
    }

    getListProduct() {
        this.productService.get().subscribe((res: any) => {
            this.data = res
            this.sortedData = res
        })
    }

    searchProduct(e) {
        if (e === '') {
            this.sortedData = this.data;
            return;
        }
        this.sortedData = this.data.filter(({ title }) => title.toLowerCase().includes(e.toString().toLowerCase()));
    }
    searchCategory(e) {
        if (e === '') {
            this.sortedData = this.data;
            return;
        }
        this.sortedData = this.data.filter(({ category }) => category.toLowerCase()===(e.toString().toLowerCase()));
    }

    changeSort(e){
        switch(e){
            case 'increase': this.sortedData.sort((a, b) => a.price - b.price); break;
            case 'decrease': this.sortedData.sort((a, b) => b.price - a.price); break;
            case 'highrate': this.sortedData.sort((a, b) => a.rate - b.rate); break;
            case 'lowrate': this.sortedData.sort((a, b) => b.rate - a.rate); break;
        }
    }

    addtoCart(index: number) {
        this.cartService.addtoCart(this.data[index]);
        this.middlewareService.sendUpdateCart(this.cartService.getNuberofCart())
    }
}
