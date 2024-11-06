import { Component, inject } from '@angular/core';
import { GeneralService } from '../services/general-service';

@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [],
  templateUrl: './contents.component.html',
  styleUrl: './contents.component.css'
})
export class ContentsComponent {
  
  private generalService = inject(GeneralService);
  colors: any;

  ngOnInit(): void {
    this.generalService.getColors().subscribe((data: any) => {
      console.log(data);
      this.colors = data;
    });
  }
}
