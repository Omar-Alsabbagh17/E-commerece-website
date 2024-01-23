import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductCategory} from "../../common/productCategory";
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive,} from '@angular/router';


/* */
@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [
    NgForOf,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent implements OnInit {

  productCategories: ProductCategory[] = [];


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories() {
    // get productCategory table from server and assign it this.productCategories
    this.productService.getProductCategories().subscribe(
      data => {
        //console.log('Product Categories=' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
