// src/app/services/inventory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface InventoryItem { id: number; name: string; category: string; quantity: number; price: number;}

@Injectable({ providedIn: 'root' })
export class InventoryService {
   //private url =  'http://localhost:5130/api/inventory'
  private url= `${environment.apiUrl1}/inventory`;
  constructor(private http: HttpClient) {}
  list(): Observable<InventoryItem[]> { return this.http.get<InventoryItem[]>(this.url); }
  add(item: Omit<InventoryItem, 'id'>): Observable<InventoryItem> { return this.http.post<InventoryItem>(this.url, item); }
  update(item: InventoryItem): Observable<void> { return this.http.put<void>(`${this.url}/${item.id}`, item); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
    addItem(item: Omit<InventoryItem, 'id'>): Observable<InventoryItem> { return this.http.post<InventoryItem>(this.url, item); }
}

