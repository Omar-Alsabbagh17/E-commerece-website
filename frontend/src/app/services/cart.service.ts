import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {CartItem} from "../common/cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:CartItem[] = [];

  // @ts-ignore
  totalPrice: BehaviorSubject<number>;
  // @ts-ignore
  totalQuantity: BehaviorSubject<number>;

  constructor() {
    this.loadState();
  }

  loadState() {
    /* Loads total Price and total quantity from local storage */
    try {
      // Get strings from LocalStorage
      const totalPriceString = localStorage.getItem('totalPrice');
      const totalQuantityString = localStorage.getItem('totalQuantity');
      const temp = localStorage.getItem('cartItems');
      // Parse strings as numbers and use them, or if they're null use default values
      this.totalPrice = new BehaviorSubject<number>(totalPriceString ? Number.parseFloat(totalPriceString) : 0);
      this.totalQuantity = new BehaviorSubject<number>(totalQuantityString ? Number.parseInt(totalQuantityString) : 0);
      // @ts-ignore
      this.cartItems = (temp ? JSON.parse(temp) : []);

    } catch(e) {
      // Handle any deserialization errors
      console.error('Error loading state', e);
    }
  }

  persistState() {
    /* this method writes totalPrice and totalQuantity to local storage */
    try {
      localStorage.setItem('totalPrice', this.totalPrice.getValue().toString());
      localStorage.setItem('totalQuantity', this.totalQuantity.getValue().toString());
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    } catch(e) {
      // Handle any serialization errors
      console.error('Error saving state', e);
    }
  }

  addToCart(newItem:CartItem){
    let alreadyExistsInCart = false;
    let existingCartItem = undefined;

    // check if the item already exists in the cart
    if (this.cartItems.length > 0){
      existingCartItem = this.cartItems.find(item => item.id === newItem.id) ;
      alreadyExistsInCart = (existingCartItem !== undefined);
    }

    if (alreadyExistsInCart){
      // @ts-ignore
      existingCartItem.quantity++;
    }
    else{  // it's a new item
      this.cartItems.push(newItem);
    }
    this.updateCart();

  }

  decrementQuantity(item:CartItem){
    item.quantity--;
    if (item.quantity === 0){
      this.remove(item);
    }
    this.updateCart();
  }

  remove(item:CartItem){
    // remove the given item from cartItems array
    const idx = this.cartItems.findIndex(temp => temp.id === item.id);
    if (idx > -1){
      this.cartItems.splice(idx, 1);
      this.updateCart();
    }


  }

  updateCart(){
    // this method updates total price and total quantity

    let tempTotalPrice = 0;
    let tempTotalQuantity = 0;
    for (let item of this.cartItems){
      tempTotalPrice += (item.unitPrice * item.quantity);
      tempTotalQuantity += item.quantity;
    }
    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(tempTotalPrice);
    this.totalQuantity.next(tempTotalQuantity);
    this.persistState();

  }

}
