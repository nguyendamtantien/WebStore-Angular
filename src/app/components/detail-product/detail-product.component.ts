import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/services/cart.service';
import { MiddlewareService } from 'src/app/services/middleware.service';

@Component({
    selector: 'app-detail-product',
    templateUrl: './detail-product.component.html',
    styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
    product: Product = null;
    constructor(
        private productService: ProductService,
        private cartService: CartService,
        private route: ActivatedRoute,
        private titleService: Title,
        private router: Router,
        private middlewareService: MiddlewareService,
    ) { }

    ngOnInit() {
        window.scrollTo(0, 0)
        this.productService.getbyId(this.route.snapshot.params['id']).subscribe((res: any) => {
            this.product = res;
            this.titleService.setTitle(this.product?.title + " - Detail Product - Best product for your")
        },
        (err: any)=> {
            if(err.status === 404){
                this.product = new Product();
                if (err.status === 404)
                    Swal.fire({
                        title: "Not Found!",
                        text: "product does not exist!",
                        icon: "error",
                    })
                this.router.navigate(['/error'])
            }
        })
    }

    addtoCart() {
        this.cartService.addtoCart(this.product);
        this.middlewareService.sendUpdateCart(this.cartService.getNuberofCart())
    }
}
