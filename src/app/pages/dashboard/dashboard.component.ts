import { Component, OnInit } from '@angular/core';
import { MongoDBService } from 'src/app/services/mongo-db.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private mongoService: MongoDBService
  ) { }

  siteArray!: any



  ngOnInit(): void {
    this.mongoService.getSites().subscribe({
      next: (res: any) => { this.siteArray = res.sites },
      error: (err) => { console.log(err) },
      complete: () => console.log(this.siteArray)
    })
  }

}
