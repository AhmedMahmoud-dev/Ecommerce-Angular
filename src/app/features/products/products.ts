import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../core/services/products/product-service';
import { Card } from '../../shared/components/card/card';
import { Loader } from "../../shared/components/loader/loader";
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipe/search-pipe';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [Card, Loader, FormsModule, SearchPipe, CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  private readonly products = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  searchInput!: string;

  currentPage!: number;
  totalPages!: number;
  pages!: any[];

  dataList: WritableSignal<any[]> = signal([]);
  loading = true;
  getData(page: number) {
    this.loading = true;
    this.products.getAllProducts(page).subscribe({
      next: (response: any) => {
        // console.log(response);
        this.dataList.set(response.data);
        this.currentPage = response.metadata.currentPage;
        this.totalPages = response.metadata.numberOfPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: (error: any) => {
        this.loading = false;
        // console.log(error);
      }, complete: () => {
        this.loading = false;
      }
    })
  }
  ngOnInit(): void {
    // this.route.paramMap.subscribe(response => {
    //   const page = +(response.get('page') || 1);
    //   this.getData(page);
    // })

    this.route.queryParamMap.subscribe(response => {
      const page = +(response.get('page') || 1);
      this.getData(page);
    })
  }

  // changePage(page: number) {
  //   this.router.navigate(['/products', page]);
  // }

  changePage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    })
  }
}