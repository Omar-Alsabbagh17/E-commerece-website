import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../common/product";
import {Observable} from "rxjs";
import {map} from "rxjs/operators"
import {ProductCategory} from "../common/productCategory";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'http://localhost:8080/api/products';
  private productCategoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProductById(productId:number): Observable<Product>{
    const productUrl:string = `${this.productsUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl)
  }


  getProductList(pageNumber:number,
                pageSize: number,
                categoryId: number): Observable<GetResponseProducts>{

    const url = `${this.productsUrl}/search/findByCategoryId?id=${categoryId}&page=${pageNumber}&size=${pageSize}`
    return this.httpClient.get<GetResponseProducts>(url);
  }


  // getProductListWithoutPagination(theCategoryId: number): Observable<Product[]> {
  //
  //   // need to build URL based on category id
  //   const searchUrl = `${this.productsUrl}/search/findByCategoryId?id=${theCategoryId}`;
  //
  //   return this.getProducts(searchUrl);
  // }

  searchProducts(theKeyword: string,
                 pageNumber:number,
                 pageSize:number): Observable<GetResponseProducts> {

    // need to build URL based on the keyword
    const searchUrl = `${this.productsUrl}/search/findByNameContaining?name=${theKeyword}&page=${pageNumber}&size=${pageSize}`
    console.log(searchUrl);
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }



  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.productCategoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
