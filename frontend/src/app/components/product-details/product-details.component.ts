import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {CurrencyPipe} from "@angular/common";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  // @ts-ignore
  product:Product = new Product();
  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService) {}

  ngOnInit() {
    const productId: number = +this.activatedRoute.snapshot.paramMap.get("id")!;
    this.productService.getProductById(productId).subscribe(response =>{
      this.product = response;
    })
  }

  addToCart(product:Product){
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}
