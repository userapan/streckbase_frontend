import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

import { environment } from "../../../environments/environment";
import { Item } from "../../types/item";

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) { }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${environment.apiUrl}/items/${id}`);
  }

  getBarcodeItem(barcode: string): Observable<Item> {
    return this.http.get<Item>(`${environment.apiUrl}/items/barcodes/${barcode}`);
  }
}