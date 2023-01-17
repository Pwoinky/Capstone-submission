import { Injectable } from "@angular/core";
import { Cart } from "./cart/cart";


@Injectable({
  providedIn: "root",
})
export class Services {
  cartProducts: Cart[] = [];
  public total = 0;

  constructor() { }

  // Shopping Cart Services
  public addToCart(product: Cart): void {
    this.cartProducts.push(product);
  }

  getItems() {
    return this.cartProducts;
  }

  clearCart() {
    this.cartProducts = [];
    this.total = this.getGrandTotal();
    return this.cartProducts;
  }

  // Total services
  ngOnInit(): void {
    this.total = this.getGrandTotal();
  }
  calculateTotal() {
    let cartTotal = 0;
    for (let cartProduct of this.cartProducts) {
      cartTotal += +cartProduct.price!;
      console.log(cartTotal);
    }
    return cartTotal;
  }

  // Tax
  getTax() {
    let Tax = 0.1 * this.calculateTotal();
    return +Tax;
  }

  // Grand Total
  getGrandTotal() {
    let grandTotal = this.calculateTotal() + this.getTax();
    if (grandTotal < 1) {
      return 0;
    }
    return grandTotal + 20; // 20 is the flat shipping charge.
  }

  // Remove Product //
  removeItem(index: number) {
    this.cartProducts.splice(index, 1);
  }

  // Number of Products in the Cart //
  calcTotal() {
    return this.cartProducts.length
  }
}


