import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MiddlewareService {
    subject = new Subject();

    constructor() { }

    sendUpdateCart(numberOfCarts){
        this.subject.next(numberOfCarts);
    }

    getUpdateCart(){
        return this.subject.asObservable()
    }
}
