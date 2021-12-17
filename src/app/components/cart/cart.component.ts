import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cartitem';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    list: CartItem[] = [];
    total: number = 0;
    router: any;
    constructor(
        private cartService: CartService,
        private titleService: Title
    ) { }

    ngOnInit() {
        // this.list.push(this.item);
        // this.cartService.setListcart(this.list);
        window.scrollTo(0, 0);
        this.list = this.cartService.getListCart();
        this.total = this.cartService.getTotal();
        this.titleService.setTitle("Cart (" + this.list.length + ") - Best Product for your!");
    }

    delete(index: number){
        Swal.fire({
            title: "Are you sure?",
            text: "Product will be delete. Cart will be update",
            icon: "warning",
            showCancelButton: true,
        })
            .then((willDelete) => {
                if (willDelete.isConfirmed) {
                    this.list = this.cartService.deleteItemCart(index);
                    this.total = this.cartService.getTotal();
                    location.reload();
                }
            });
    }

    deleteCartItem(index: number){
        this.list.splice(index, 1);
        this.cartService.setListcart(this.list);
    }
}
