import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productList: any[], searchWord: string): any[] {
    return productList.filter(product => {
      if (!searchWord || searchWord.trim() === '') {
        return productList;
      }
      return product.title.toLowerCase().includes(searchWord.toLowerCase());
    })
  }
}