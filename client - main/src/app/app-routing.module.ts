import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ShirtsComponent } from "./shirts/shirt.component";
import { CartComponent } from "./cart/cart.component";
import { BooksComponent } from "./books/books.component";
import { AdminPageComponent } from "./product-list/admin-page.component"
import { AddShirtComponent } from "./add-shirt/add-shirt.component";
import { EditShirtComponent } from "./edit-shirt/edit-shirt.component";
import { AddBookComponent } from "./add-book/add-book.component";
import { EditBookComponent } from "./edit-book/edit-book.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "books", component: BooksComponent },
  { path: "shirts", component: ShirtsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'Admin', component: AdminPageComponent },
  { path: 'Admin/newShirt', component: AddShirtComponent },
  { path: 'Admin/editShirt/:id', component: EditShirtComponent },
  { path: 'Admin/newBook', component: AddBookComponent },
  { path: 'Admin/editBook/:id', component: EditBookComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
