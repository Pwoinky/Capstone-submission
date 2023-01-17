import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class bookServices {
  private url = "http://localhost:5200";
  private books$: Subject<Product[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  // Book Product
  private refreshBooks() {
    this.httpClient
      .get<Product[]>(`${this.url}/books`)
      .subscribe((books) => {
        this.books$.next(books);
      });
  }

  getBooks(): Subject<Product[]> {
    this.refreshBooks();
    return this.books$;
  }

  getBook(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/books/${id}`);
  }

  createBook(product: Product): Observable<string> {
    return this.httpClient.post(`${this.url}/books`, product, { responseType: 'text' });
  }

  updateBook(id: string, product: Product): Observable<string> {
    return this.httpClient.put(`${this.url}/books/${id}`, product, { responseType: 'text' });
  }

  deleteBook(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/books/${id}`, { responseType: 'text' });
  }
}