import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]); 
  public search = new BehaviorSubject<string>('');  

  constructor() {}

  // get products --------------------------------
  getProducts() {
    return this.productList.asObservable();  
  }

  // set product ---------------------------------
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  // add to cart ---------------------------------
  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log('cartItemList :---', this.cartItemList);
  }

  // get grand total -----------------------------
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }

  // remove one product --------------------------
  removeCartItem(index: number){
    // this.cartItemList.map((a:any, index:any)=>{
      // if(product.id=== a.id){
      //   this.cartItemList.splice(index);
      // }
    // })
    this.cartItemList.splice(index, 1);
    this.productList.next(this.cartItemList);

  }

  // Empty all products from the cart ------------
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}



    // 1) BehaviorSubject: A Subject that requires an initial value and  emits its current value to new subscribers. 
    //                                                  OR
    // Behavior subject represents the current value , It is similar to the subject but the difference 
    // is that we can set the initial value in the behavior subject. 

    // 2) asObservable() : The purpose of this is to prevent leaking the "observer side" of the Subject out of an API .
    