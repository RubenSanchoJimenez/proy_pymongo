import { Component } from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-head-menu',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './head-menu.component.html',
  styleUrl: './head-menu.component.css'
})
export class HeadMenuComponent {

  constructor() {
  }
}
