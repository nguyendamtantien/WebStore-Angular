import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { CartService } from 'src/app/services/cart.service';
import { MiddlewareService } from 'src/app/services/middleware.service';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {
    numberofCartItem: number;
    user: User;
    constructor(
        private accountService: AccountService,
        private cartService: CartService,
        private middlewareService: MiddlewareService,
    ) {
        this.accountService.user.subscribe(x => this.user = x);
        this.user = this.accountService.userValue;
        this.numberofCartItem = cartService.getNuberofCart();
    }

    ngOnInit(): void {
        this.middlewareService.getUpdateCart().subscribe(count => {
            this.numberofCartItem = count as number;
        })
    }
    logout() {
        this.accountService.logout();
    }
}
