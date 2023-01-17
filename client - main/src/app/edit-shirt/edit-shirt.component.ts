import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { ShirtServices } from '../shirts/shirt.service';

@Component({
  selector: 'app-edit-employee.component.ts',
  templateUrl: './edit-shirt.component.html',
 })
 export class EditShirtComponent implements OnInit {
  shirt: BehaviorSubject<Product> = new BehaviorSubject({});
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shirtService: ShirtServices,
  ) { }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }
  
    this.shirtService.getShirt(id !).subscribe((product) => {
      this.shirt.next(product);
    });
  }
  
  editProduct(product: Product) {
    this.shirtService.updateShirt(this.shirt.value._id || '', product)
      .subscribe({
        next: () => {
          this.router.navigate(['/Admin']);
        },
        error: (error) => {
          alert('Failed to update Shirt');
          console.error(error);
        }
      })
  }
 }
