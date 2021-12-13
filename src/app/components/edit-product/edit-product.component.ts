import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import Swal from 'sweetalert2';

interface Category {
    value: string;
    viewValue: string;
  }
@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
    categorys: Category[] = [
        {value: 'Iphone', viewValue: 'Iphone'},
        {value: 'Samsung', viewValue: 'Samsung'},
        {value: 'OPPO', viewValue: 'OPPO'},
        {value: 'Xiaomi', viewValue: 'XIAOMI'},
        {value: 'Nokia', viewValue: 'Nokia'},
      ];
    product: Product;
    listProduct: Product[];
    chooseProduct: number;
    isChooseProduct: boolean = false;
    loading: boolean = false;
    onSubmit: boolean = false;

    @ViewChild('FormEditProduct') formEditProduct: NgForm;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
    ) { }

    ngOnInit() {
        window.scrollTo(0, 200);
        this.titleService.setTitle("Edit " + " - Best product for your!")
        this.productService.get().subscribe((res: any) => {
            this.listProduct = res
        })
        
        let idParam = this.route.snapshot.params['id']
        if (idParam)
            this.chooseProduct = idParam;
        if (!this.chooseProduct) {
            this.isChooseProduct = false;
            this.loading = false;
        } else
            this.getProduct(this.chooseProduct);
    }

    getProduct(id: number) {
        this.loading = true;
        this.productService.getbyId(this.chooseProduct).subscribe(
            (res: any) => {
                this.product = res
                this.loading = false;
                this.isChooseProduct = true;
                this.titleService.setTitle("Edit " + this.product.title + " - Best product for your!")
            },
            (err: any) => {
                this.loading = false;
                if (err.status === 404)
                    Swal.fire({
                        title: "No Found!",
                        text: "Product does not exist!",
                        icon: "error",
                    })
                this.router.navigate(['/dashboard/editproduct'])
            })
    }

    changeChooseProduct(e) {
        this.chooseProduct = e;
        this.getProduct(e);
    }
    updateProduct_Click() {
        this.onSubmit = true;

        if (!this.formEditProduct.invalid) {
            console.log(this.product)
            this.productService.updateProduct(this.product).subscribe(
                (res: any) => {
                    console.log(res)
                    Swal.fire({
                        title: "Good job!",
                        text: "Updated success!",
                        icon: "success",
                    })
                    this.onSubmit = false;
                },
                (err: any) => {
                    Swal.fire({
                        title: "Failed!",
                        text: err,
                        icon: "error",
                    })
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
