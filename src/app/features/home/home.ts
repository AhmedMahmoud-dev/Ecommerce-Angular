import { Component } from '@angular/core';
import { Products } from "../products/products";
import { MainSlider } from "../main-slider/main-slider";
import { Categories } from '../categories/categories';

@Component({
  selector: 'app-home',
  imports: [Products, Categories, MainSlider],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}