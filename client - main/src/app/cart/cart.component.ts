import { Component } from "@angular/core";
import { Services } from "../services";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent {
  products = this.services.getItems();
  total = this.services.getGrandTotal();
  cartTotal = this.services.calcTotal();

  tax = this.services.getTax();
  popup = false;


  constructor(
    private services: Services,
  ) { }

  ngOnInit() {
    this.products = this.services.getItems();
  }

  onSubmit() {
    this.products = this.services.clearCart();
    this.total = this.services.getGrandTotal();
    this.cartTotal = this.services.calcTotal();
    this.popup = true;
  }

  removeItem(index: number) {
    this.services.removeItem(index);
    this.total = this.services.getGrandTotal();
    this.cartTotal = this.services.calcTotal();
    this.tax = this.services.getTax();
  }
}
