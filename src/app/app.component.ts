import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeadMenuComponent} from "./shared/head-menu/head-menu.component";
import {SideBarComponent} from "./shared/side-bar/side-bar.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeadMenuComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor() {}


}
