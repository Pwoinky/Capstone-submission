import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { bookServices } from '../books/book.service';

@Component({
  selector: 'app-edit-employee.component.ts',
  templateUrl: './edit-book.component.html',
 })
 export class EditBookComponent implements OnInit {
  book: BehaviorSubject<Product> = new BehaviorSubject({});
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: bookServices,
  ) { }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }
  
    this.bookService.getBook(id !).subscribe((product) => {
      this.book.next(product);
    });
  }
  
  editProduct(product: Product) {
    this.bookService.updateBook(this.book.value._id || '', product)
      .subscribe({
        next: () => {
          this.router.navigate(['/Admin']);
        },
        error: (error) => {
          alert('Failed to update Book');
          console.error(error);
        }
      })
  }
 }
