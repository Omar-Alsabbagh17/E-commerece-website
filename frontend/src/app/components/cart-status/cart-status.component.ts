import {Component, OnInit} from '@angular/core';
import {CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit{
  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService:CartService) {
  }
  ngOnInit() {
    this.updateCartStatus();
  }
  updateCartStatus(){

    this.cartService.totalPrice.subscribe( newPrice =>{
      this.totalPrice = newPrice;
    })

    this.cartService.totalQuantity.subscribe(updatedQuantity =>{
      this.totalQuantity = updatedQuantity;
    })
  }


}
