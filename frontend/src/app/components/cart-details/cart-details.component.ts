import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";
import {BehaviorSubject} from "rxjs";
import {CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{
  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalQuantity = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(){
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(data =>{
      this.totalPrice = data;
    })
    this.cartService.totalQuantity.subscribe(data =>{
      this.totalQuantity = data;
    })
  }

  incrementQuantity(item: CartItem) {
    this.cartService.addToCart(item);
  }

  decrementQuantity(item: CartItem) {
    this.cartService.decrementQuantity(item);
  }

  remove(item: CartItem) {
    this.cartService.remove(item);
  }
}
