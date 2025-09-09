import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands-service';
import { ToastrService } from 'ngx-toastr';
import { Loader } from '../../shared/components/loader/loader';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-brands',
  imports: [Loader, CommonModule],
  templateUrl: './brands.html',
  styleUrl: './brands.css'
})
export class Brands implements OnInit {

  private readonly brands = inject(BrandsService);
  private readonly toastr = inject(ToastrService);
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router);
  dataList: WritableSignal<any[]> = signal([]);
  loading: boolean = true;

  selectedImage: string | null = null;
  title!: string;
  currentPage!: number;
  totalPages!: number;
  pages!: any[];

  openPreview(image: string, title: string) {
    this.selectedImage = image;
    this.title = title;
  }

  closePreview() {
    this.selectedImage = null;
  }

  ngOnInit(): void {
    // this.route.queryParamMap.subscribe(response => {
    //   const page = +(response.get('page') || 1);
    //   this.getBrands(page);
    // })

    this.route.paramMap.subscribe(response => {
      const page = +(response.get('page') || 1);
      this.getBrands(page);
    })
  }

  getBrands(page: number) {
    this.loading = true;
    this.brands.getBrands(page).subscribe({
      next: (response) => {
        this.dataList.set(response.data);
        this.currentPage = response.metadata.currentPage;
        this.totalPages = response.metadata.numberOfPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: (error) => {
        this.toastr.error('SomeThing Went Wrong', 'Fail');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  changePage(page: number) {
    // this.router.navigate([], {
    //   relativeTo: this.route,
    //   queryParams: { page },
    //   queryParamsHandling: 'merge'
    // })

    this.router.navigate(['/brands', page])
  }
}