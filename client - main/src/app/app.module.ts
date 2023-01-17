import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';
import { BooksComponent } from './books/books.component';
import { ShirtsComponent } from './shirts/shirt.component';
import { HomeComponent } from './home/home.component';
import { AdminPageComponent } from './product-list/admin-page.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AddShirtComponent } from './add-shirt/add-shirt.component';
import { EditShirtComponent } from './edit-shirt/edit-shirt.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CartComponent,
    BooksComponent,
    ShirtsComponent,
    AdminPageComponent,
    ProductFormComponent,
    AddShirtComponent,
    AddBookComponent,
    EditShirtComponent,
    EditBookComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbCollapseModule,
    NgxNavbarModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
