import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { bookServices } from '../books/book.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: "add-book.component.html"
}) 
export class AddBookComponent {
  constructor(
    private router: Router,
    private bookServices: bookServices
  ) { }
  
  addBook(product: Product) {
    this.bookServices.createBook(product)
      .subscribe({
        next: () => {
          this.router.navigate(['/Admin']);
        },
        error: (error) => {
          alert("Failed to create product");
          console.error(error);
        }
      });
  }
 }
