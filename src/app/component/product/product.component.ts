import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CartService } from '../../service/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

   productList: any;
   public filterCategory : any
   searchKey:string ="";

  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getList();
  }

  // get list ------------------------------------------------------------------
  getList() {
    this.api.getProduct().then((data) => {
      this.productList = data;
      this.filterCategory = data;

      this.productList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
    });
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  // add to cart ----------------------------------------------------------------
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }

  // Category filter ------------------------------------------------------------
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

}
