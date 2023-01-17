import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Product } from "../models/product";


@Injectable({
  providedIn: "root",
})
export class ShirtServices {
  private url = "http://localhost:5200";
  private shirts$: Subject<Product[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  // Products
  private refreshProducts() {
    this.httpClient
      .get<Product[]>(`${this.url}/products`)
      .subscribe(shirts => {
        this.shirts$.next(shirts);
      });
  }
  getShirts(): Subject<Product[]> {
    this.refreshProducts();
    return this.shirts$;
  }

  getShirt(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/products/${id}`);
  }

  createShirt(product: Product): Observable<string> {
    return this.httpClient.post(`${this.url}/products`, product, { responseType: 'text' });
  }

  updateShirt(id: string, product: Product): Observable<string> {
    return this.httpClient.put(`${this.url}/products/${id}`, product, { responseType: 'text' });
  }

  deleteShirt(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/products/${id}`, { responseType: 'text' });
  }
}
