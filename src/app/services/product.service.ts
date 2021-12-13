import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from 'src/app/models/Product';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
}
const apiUrl = 'https://tienwebapi.azurewebsites.net';
@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private httpClient: HttpClient) { }

    get(): Observable<Product[]> {
        return this.httpClient.get<Product[]>(`${apiUrl}/api/Products`).pipe()
    }
    getbyId(id: number): Observable<Product> {
        return this.httpClient.get<Product>(`${apiUrl}/api/Products/${id}`).pipe()
    }
    addNewProduct(product: Product){
        return this.httpClient.post<Product>(`${apiUrl}/api/Products`, product, httpOptions).pipe(catchError(error => {
            let errorMsg: string;
            if (error.error instanceof ErrorEvent)
                errorMsg = `Error: ${error.error.message}`;
            else
                errorMsg = this.getServerErrorMessage(error);
            return throwError(errorMsg);
        }))
    }

    deletebyId(id: number): Observable<Product> {
        return this.httpClient.delete<Product>(`${apiUrl}/api/Products/${id}`).pipe(catchError(error => {
            let errorMsg: string;
            if (error.error instanceof ErrorEvent)
                errorMsg = `Error: ${error.error.message}`;
            else
                errorMsg = this.getServerErrorMessage(error);
            return throwError(errorMsg);
        }))
    }

    updateProduct(product: Product): Observable<Product>{
        console.log(`${apiUrl}/api/Product/${product.id}`)
        return this.httpClient.put<Product>(`${apiUrl}/api/Products/${product.id}`, product, httpOptions).pipe(catchError(error => {
            let errorMsg: string;
            if (error.error instanceof ErrorEvent)
                errorMsg = `Error: ${error.error.message}`;
            else
                errorMsg = this.getServerErrorMessage(error);
            return throwError(errorMsg);
        }))
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: return `Not Found: ${error.message}`;
            case 403: return `Access Denied: ${error.message}`;
            case 500: return `Internal Server Error: ${error.message}`;
            default: return `Unknown Server Error: ${error.message}`;
        }
    }
}


