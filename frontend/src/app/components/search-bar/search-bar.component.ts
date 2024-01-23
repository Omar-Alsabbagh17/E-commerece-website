import { Component } from '@angular/core';
import {Router} from "@angular/router";


/* Component class for the search bar at the top of page */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  constructor(private router: Router) {
  }

  doSearch(value:string) {
    this.router.navigateByUrl(`/search/${value}`);
  }
}
