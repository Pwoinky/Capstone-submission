import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from "../models/product";
import { ShirtServices } from '../shirts/shirt.service';
import { bookServices } from '../books/book.service';
import { LoginService } from '../login/login.service';
import { User } from '../models/user';
import { LoggedIn } from '../models/loggedIn';

@Component({
  selector: 'app-product-edit-list',
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"],
})
export class AdminPageComponent implements OnInit {
  books$: Observable<Product[]> = new Observable();
  products$: Observable<Product[]> = new Observable();
  users$: Observable<User[]> = new Observable();
  loginStatus$: Observable<LoggedIn> = new Observable();
  shirtPopup = false;
  bookPopup = false;
  admin = false;


  constructor(private booksServices: bookServices,
    private shirtsService: ShirtServices, private loginService: LoginService,) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchBooks();
    this.fetchUsers();
    this.loginService.adminLogin.subscribe((newValue) => this.admin = newValue);
  }

  deleteShirt(id: string): void {
    this.shirtsService.deleteShirt(id).subscribe({
      next: () => this.fetchProducts()
    });
  }

  private fetchProducts(): void {
    this.products$ = this.shirtsService.getShirts();
  }

  deleteBook(id: string): void {
    this.booksServices.deleteBook(id).subscribe({
      next: () => this.fetchBooks()
    });
  }

  private fetchBooks(): void {
    this.books$ = this.booksServices.getBooks();
  }

  private fetchUsers(): void {
    this.users$ = this.loginService.getUsers();
}

}
