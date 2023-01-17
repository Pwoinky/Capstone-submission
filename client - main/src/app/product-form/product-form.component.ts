import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
}) 

export class ProductFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Product> = new BehaviorSubject({});
  
  @Output()
  formValuesChanged = new EventEmitter<Product>();
  
  @Output()
  formSubmitted = new EventEmitter<Product>();
  
  productForm: FormGroup = new FormGroup({});
  
  constructor(private fb: FormBuilder) { }
  
  get id() { return this.productForm.get('id')!; }
  get name() { return this.productForm.get('name')!; }
  get image() { return this.productForm.get('image')!; }
  get price() { return this.productForm.get('price')!; }
  
  ngOnInit() {
    this.initialState.subscribe(product => {
      this.productForm = this.fb.group({
        id: [ product.id, [Validators.required] ],
        name: [ product.name, [ Validators.required] ],
        image: [ product.image, [Validators.required] ],
        price: [ product.price, [Validators.required] ],
      });
    });
  
    this.productForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }
  
  submitForm() {
    this.formSubmitted.emit(this.productForm.value);
  }
 }
