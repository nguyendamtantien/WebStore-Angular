import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartitem';

@Injectable({
    providedIn: 'root',
})

export class CartService {
    // listcart: CartItem[] = [];
    constructor(
        private toastr: ToastrService
    ) { }

    OnInit() {
        if (JSON.parse(localStorage.getItem('productitem')) == null){
            localStorage.setItem("productitem", JSON.stringify([]));
        }
    }

    setListcart(cartItem: CartItem[]) {
        this.OnInit()
        let listcart;
        listcart = cartItem;
        localStorage.setItem("productitem", JSON.stringify(listcart));
    }
    addtoCart(product) {
        this.OnInit()
        let listcart;
        listcart = JSON.parse(localStorage.getItem('productitem'));
        // Update item exist
        if (listcart.find(item => item.id === product.id)) {
            // Get index of item exist
            let index = listcart.findIndex(item => item.id === product.id)
            let temp = {
                id: product.id,
                imgSource: product.imgSource,
                quantity: listcart[index].quantity + 1,
                price: product.price,
                subtotal: (listcart[index].quantity + 1) * product.price,
            };
            listcart.splice(index, 1);
            listcart.unshift(temp);
            localStorage.setItem("productitem", JSON.stringify(listcart));
            this.toastr.success('Updated your cart!', 'Updated');
        }
        // Add new item to cart
        else {
            let temp = {
                id: product.id,
                imgSource: product.imgSource,
                quantity: 1,
                price: product.price,
                subtotal: product.price,
            };
            listcart.unshift(temp);
            localStorage.setItem("productitem", JSON.stringify(listcart));
            this.toastr.success('Add to cart!', 'Added');
        }
        return listcart;
    }

    deleteItemCart(index: number) {
        this.OnInit()
        let listcart: CartItem[];
        listcart = JSON.parse(localStorage.getItem('productitem'));
        listcart.splice(index, 1)
        localStorage.setItem("productitem", JSON.stringify(listcart));
        return listcart;
    }

    getTotal() {
        this.OnInit()
        let listcart;
        listcart = JSON.parse(localStorage.getItem('productitem'));
        return listcart.reduce((prev, curr) => prev + curr["price"] * curr["quantity"], 0);
    }

    getNuberofCart() {
        this.OnInit()
        let listcart;
        listcart = JSON.parse(localStorage.getItem('productitem'));
        return listcart ? listcart.length : 0;
    }

    getListCart() {
        this.OnInit()
        let listcart;
        listcart = JSON.parse(localStorage.getItem('productitem'));
        return listcart;
    }
}