import { Product } from './../../models/Product';
import { ListComponent } from './../users/list.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';


// enum Estatus{
//     true = "Enable",
//     false = "Disabled"   
// }
@Component({
    selector: 'app-manage-product',
    templateUrl: './manage-product.component.html',
    styleUrls: ['./manage-product.component.css']
})

export class ManageProductComponent implements OnInit {
    productModal: Product = new Product();
    listProduct: Product[];
    filter: string = 'all';
    loading: boolean = false;
    searchString: string = '';
    // data: [];
    clean: boolean = false;

    dataSource: Product[];
    //displayedColumns = ['id','imgSource', 'title', 'price', 'rate']
    // public dataSource = new MatTableDataSource(this.product);
    // @ViewChild(MatSort, { static: true }) sort: MatSort;
    // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private productService: ProductService,
        private titleService: Title,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.changeFilter('all');
        // this.getListProduct();
        this.titleService.setTitle("Manage Product" + " - Best product for you!")
    }
    changeFilter(e) {
        this.loading = true;
        this.listProduct = null;
        switch (e) {
            case 'all': this.productService.get().subscribe((res: any) => {
                this.listProduct = res
                this.dataSource = this.listProduct.slice();
                this.loading = false;
            }); break;
            case 'available': this.productService.get().subscribe((res: any) => {
                this.listProduct = res
                this.dataSource = this.listProduct.slice();
                this.loading = false;
                var data = this.dataSource.filter(product => product.quantity>0
                )
                this.dataSource= data;
                // console.log(this.dataSource);
            }); break;
            case 'deleted': this.productService.get().subscribe((res: any) => {
                this.listProduct = res
                this.dataSource = this.listProduct.slice();
                this.loading = false;
                var data = this.dataSource.filter(({quantity}) => quantity===0
                )
                this.dataSource= data;
            }); break;
        }
    }
    openModal(content, index: number){
        this.productModal = this.dataSource[index];
        this.modalService.open(content);
    }
    delete_Click(id: number) {
        Swal.fire({
            title: "Are you sure?",
            text: "Product will be delete, you can be restore later!",
            icon: "warning",
            showCancelButton: true,
        })
            .then((willDelete) => {
                if (willDelete.isConfirmed) {
                    this.productService.deletebyId(id).subscribe(
                        (res: any) => {
                            Swal.fire({
                                title: "Good job!",
                                text: "Deleted success!",
                                icon: "success",
                            })
                            this.changeFilter(this.filter);
                        },
                        (err: any) => {
                            Swal.fire({
                                title: "Failed!",
                                text: err,
                                icon: "error",
                            })
                            console.log(err);
                        }
                    );
                }
            });
    }
    searchProduct(e) {
        if (e === '') {
            this.dataSource = this.dataSource;
            return;
        }
        this.dataSource = this.dataSource.filter(({ title }) => title.toLowerCase().includes(e.toString().toLowerCase()));
    }
    sortData(sort: MatSort) {
        const data = this.dataSource.slice();
        if (!sort.active || sort.direction === '') {
            this.dataSource = data;
            return;
        }
        this.dataSource = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'id': return compare(a.id, b.id, isAsc);
                case 'title': return compare(a.title, b.title, isAsc);
                case 'price': return compare(a.price, b.price, isAsc);
                case 'rate': return compare(a.rate, b.rate, isAsc);
                case 'quantity': return compare(a.rate, b.rate, isAsc);
                default: return 0;
            }
        });
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}