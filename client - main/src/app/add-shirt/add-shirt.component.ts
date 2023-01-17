import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ShirtServices } from '../shirts/shirt.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: "add-shirt.component.html"
}) 
export class AddShirtComponent {
  constructor(
    private router: Router,
    private shirtServices: ShirtServices
  ) { }
  
  addShirt(product: Product) {
    this.shirtServices.createShirt(product)
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
