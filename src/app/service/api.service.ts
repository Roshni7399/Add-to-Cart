import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // get product list 
  async getProduct(): Promise<any> {
    const data: any = await this.http
      .get('http://localhost:8989/product/list')
      .toPromise();
    if (data) {
      return data.result;
    } else {
      return false;
    }
  }
}
