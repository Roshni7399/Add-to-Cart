import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public products : any = [];
  public grandTotal !: number;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  // Remove only one item ---------------------------------
  removeItem(item: any){
    this.cartService.removeCartItem(item);
    console.log("reomve:-", item);
  }

  // Empty cart -------------------------------------------
  emptycart(){
    this.cartService.removeAllCart();
  }

}
