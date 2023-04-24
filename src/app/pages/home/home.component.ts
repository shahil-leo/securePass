import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private Router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.Router.navigate(['/dashboard'])
    } else {
      this.Router.navigate(['/'])
    }
  }

}
