import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductCategoryComponent} from "./components/product-category/product-category.component";
import {SearchBarComponent} from "./components/search-bar/search-bar.component";
import {CartStatusComponent} from "./components/cart-status/cart-status.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductListComponent, RouterLink, RouterLinkActive, ProductCategoryComponent, SearchBarComponent, NgOptimizedImage, CartStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
