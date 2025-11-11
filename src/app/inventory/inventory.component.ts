import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  filteredItems: InventoryItem[] = [];

  editing: InventoryItem | null = null;
  searchText: string = '';

  // 🧭 Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;

  constructor(private inv: InventoryService, private router: Router) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.inv.list().subscribe((items) => {
      this.items = items;
      this.filteredItems = items;
      this.updatePagination();
    });
  }

  // 🔍 Search filter
  filterItems() {
    const search = this.searchText.toLowerCase();
    this.filteredItems = this.items.filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.category.toLowerCase().includes(search)
    );
    this.currentPage = 1; // reset to first page
    this.updatePagination();
  }

  // 🔢 Pagination helpers
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  get paginatedItems(): InventoryItem[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredItems.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  // ➕ Add, Edit, Delete
  goToAddItem() {
    this.router.navigate(['/inventory/add']);
  }

  edit(item: InventoryItem) {
    this.editing = { ...item };
  }

  save() {
    if (!this.editing) return;
    this.inv.update(this.editing).subscribe(() => {
      this.editing = null;
      this.load();
    });
  }

  remove(id: number) {
    this.inv.delete(id).subscribe(() => {
      this.load();
    });
  }
}
