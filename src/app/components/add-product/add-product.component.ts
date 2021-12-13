import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import Swal from 'sweetalert2';
interface Category {
    value: string;
    viewValue: string;
  }
@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
    categorys: Category[] = [
        {value: 'Iphone', viewValue: 'Iphone'},
        {value: 'Samsung', viewValue: 'Samsung'},
        {value: 'OPPO', viewValue: 'OPPO'},
        {value: 'Xiaomi', viewValue: 'XIAOMI'},
        {value: 'Nokia', viewValue: 'Nokia'},
      ];
    product: Product = new Product();
    onSubmit: boolean = false;

    @ViewChild('FormAddProduct') FormAddProduct: NgForm;

    constructor(
        private productService: ProductService,
        private titleService: Title
    ) { }

    ngOnInit() {
        this.titleService.setTitle("Add new product " + " - Best product for your!")
    }

    addNewProduct_Click() {
        this.onSubmit = true;

        if (!this.FormAddProduct.invalid) {
            this.productService.addNewProduct(this.product).subscribe(
                (res: any) => {
                    Swal.fire({
                        title: "Good job!",
                        text: "New product added!",
                        icon: "success",
                    })
                    this.product = new Product();
                    this.onSubmit = false;
                    window.location.reload();
                },
                (err: any) => {
                    Swal.fire({
                        title: "Failed!",
                        text: err,
                        icon: "error",
                    })
                    console.log(this.onSubmit);
                    console.log(err);
                    this.onSubmit = false;
                }
            )
        }
        else {
            Swal.fire({
                title: "Warning!",
                text: "You must type all required fields!",
                icon: "warning",
            })
            this.onSubmit = false;
        }
    }
}
