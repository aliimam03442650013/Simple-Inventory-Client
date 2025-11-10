import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../services/inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class InventoryComponent implements OnInit {
  items: InventoryItem[] = [];
  form: Partial<InventoryItem> = { name: '',category: '', quantity: 0, price: 0 };
  editing: InventoryItem | null = null;

  constructor(private inv: InventoryService) {}

  ngOnInit() { this.load(); }
  load() { this.inv.list().subscribe(items => (this.items = items)); }

  addItem() {
    if (!this.form.name) return;
    this.inv.add(this.form as InventoryItem).subscribe(() => {
      this.form = { name: '',category: '', quantity: 0, price: 0 };
      this.load();
    });
  }

  edit(item: InventoryItem) { this.editing = { ...item }; }
  save() {
    if (!this.editing) return;
    this.inv.update(this.editing).subscribe(() => {
      this.editing = null;
      this.load();
    });
  }
  remove(id: number) { this.inv.delete(id).subscribe(() => this.load()); }
}
