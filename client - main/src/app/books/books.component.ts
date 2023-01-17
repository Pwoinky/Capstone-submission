import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Services } from '../services';
import { Product } from '../models/product';
import { bookServices } from './book.service';


@Component({
  selector: "app-product-list",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent implements OnInit {
  books$: Observable<Product[]> = new Observable();
  popup = false;


  constructor(
    private bookServices: bookServices,
    private productService: Services,
  ) { }

  ngOnInit(): void {
    this.fetchBooks();
  }
 

  private fetchBooks(): void {
    this.books$ = this.bookServices.getBooks();
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
    this.popup = true;
    setTimeout(() => this.popup = false, 1000);
  }

}
