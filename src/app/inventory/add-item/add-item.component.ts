import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventoryService, InventoryItem } from '../../services/inventory.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule],  // ✅ IMPORTANT: Add FormsModule here
  templateUrl: './add-item.html',        // ✅ Ensure filename matches exactly
  styleUrls: ['./add-item.css']
})
export class AddItemComponent {
  item: InventoryItem = {
    id: 0,
    name: '',
    category: '',
    quantity: 0,
    price: 0
  };

  constructor(private inventoryService: InventoryService, private router: Router) {}

  saveItem() {
    this.inventoryService.add(this.item).subscribe({
      next: () => {
        alert('Item added successfully!');
        this.router.navigate(['/inventory']);
      },
      error: (err) => console.error('Error adding item:', err)
    });
  }

  cancel() {
    this.router.navigate(['/inventory']);
  }
}
