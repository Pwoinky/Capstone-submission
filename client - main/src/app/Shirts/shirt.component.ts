import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Services } from '../services';
import { Product } from '../models/product';
import { ShirtServices } from './shirt.service';

@Component({
    selector: "app-product-list",
    templateUrl: "./shirt.component.html",
    styleUrls: ["./shirt.component.css"],
  })
export class ShirtsComponent implements OnInit {
  products$: Observable<Product[]> = new Observable();
  popup = false;



  constructor(
    private shirtService: ShirtServices,
    private productService: Services,
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  private fetchProducts(): void {
    this.products$ = this.shirtService.getShirts();
  }

  addToCart(product: Product): void {
    this.productService.addToCart(product);
    this.popup = true;
    setTimeout(() => this.popup = false, 1000);
  }
}