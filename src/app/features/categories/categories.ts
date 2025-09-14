import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories-service';
import { Loader } from "../../shared/components/loader/loader";
import { CategorySlider } from "../../shared/components/category-slider/category-slider";

@Component({
  selector: 'app-categories',
  imports: [Loader, CategorySlider],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {
  private categories = inject(CategoriesService);
  dataList: WritableSignal<any[]> = signal([]);
  loading = true;
  getData() {
    this.categories.getAllCategories().subscribe({
      next: (response) => {
        // console.log(response);
        this.dataList.set(response.data);
      },
      error: (error) => {
        // console.log(error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
  ngOnInit(): void {
    this.getData();
  }
}